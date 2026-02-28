const transactionModel = require('../Models/Transaction.model')
const ledgerModel = require('../Models/Ledger.model')
const accountModel = require('../Models/Account.model') 
const emailService = require('../Services/Email.service')
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
}

/**
 * 2. validate idempotency Key
 */



}
