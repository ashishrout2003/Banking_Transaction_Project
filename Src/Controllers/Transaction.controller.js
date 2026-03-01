const transactionModel = require('../Models/Transaction.model')
const ledgerModel = require('../Models/Ledger.model')
const accountModel = require('../Models/Account.model') 
const emailService = require('../Services/Email.service')
const mongoose = require('mongoose')

/**
 * - Create a new transaction
 * THE 10 STEP TRANSFER FLOW:
     * 1. validate request
     * 2.validate idempotency key
     * 3.check account status
     * 4.derive sender balance from ledger
     * 5.create transction (PENDING)
     * 6.Create DEBIT Ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transction completed
     * 9. commit mongoDB session
     * 10. Send email notification
 */
async function createTransaction(req, res){
    const {fromAccount, toAccount, amount, idempotenctKey} = req.body
    if(!fromAccount || !toAccount || !amount || !idempotenctKey){
        return res.status(401).json({
            message: "FromAccount, Toaccount, Amount and IdempotencyKey are required"
        })
    }

const fromUserAccount = await accountModel.find({
    _id: fromAccount,
})
const toUserAccount = await accountModel.findOne({
    _id: toAccount,
})
if(!fromUserAccount || !toUserAccount){
    return res.status(401).json({
        message: "invalid fromAccount and toAccount"
    })
}}

/**
 * 2. validate idempotency Key
 */

const istransactionAlreadyExist = await transactionModel.findOne({
    idempotenctKey: idempotenctKey
})
if(istransactionAlreadyExist){
    if(istransactionAlreadyExist.status === "COMPLETED"){
       return res.status(200).json({
            message: "Transaction already proceed",
            transaction: istransactionAlreadyExist
        })
    }
    if(istransactionAlreadyExist.status === "PENDING"){
       return res.status(200).json({
            message: "Transaction is still processing"
        })
    }
    if(istransactionAlreadyExist.status === "FAILED"){
       return res.status(500).json({
            message: "Transaction is Failed"
        })
    }
    if(istransactionAlreadyExist.status === "REVERSED"){
       return res.status(200).json({
            message: "Transactioon is Reversed please try again"
        })
    }

    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE"){
    return res.status(400).json({
        message: "Both fromUserAccount and toUserAccount must be ACTIVE to process a transaction"
        
    })
}
const balance = await fromUserAccount.getBalance()
if(balance < amount){
    return res.status(400).json({
        message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount} `
    })
}

const session = await mongoose.startSession()
session.startTransaction()

const transaction = await transactionModel.create({
    fromAccount,
    toAccount,
    amount,
    idempotencyKey,
    status: "PENDING",
}, {session})

const debitLedgerEntry = await ledgerModel.create({
    account: fromAccount,
    amount: amount,
    transaction: transaction._id,
    type: "DEBIT"
}, {session})

const creditLedgerEntry = await ledgerModel.create({
    account: toAccount,
    amount: amount,
    transaction: transaction._id,
    type: "CREDIT"
}, {session})

transaction.status = "COMPLETED"
await transaction.save({session})

await session.commitTransaction()
session.endSession()

await emailService.sendtransactionEmail(req.user.email, req.user.name, amount, toAccount)

return res.status(201).json({
    message: "Transaction completed successfully",
    transaction: transaction
})

}

module.exports = {
    createTransaction
}

