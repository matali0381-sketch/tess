class PaymentProcessor {
    constructor() {
        this.payments = [];
        this.transactionId = 0;
    }

    processStripePayment(orderId, amount, token, customerEmail) {
        const transactionId = ++this.transactionId;
        const payment = {
            transactionId,
            orderId,
            amount: parseFloat(amount),
            gateway: 'Stripe',
            token,
            customerEmail,
            status: 'completed',
            timestamp: new Date().toISOString(),
            receiptUrl: `https://stripe.com/receipts/${transactionId}`
        };
        this.payments.push(payment);
        return { success: true, payment };
    }

    processPayPalPayment(orderId, amount, paypalEmail) {
        const transactionId = ++this.transactionId;
        const payment = {
            transactionId,
            orderId,
            amount: parseFloat(amount),
            gateway: 'PayPal',
            paypalEmail,
            status: 'pending',
            timestamp: new Date().toISOString()
        };
        this.payments.push(payment);
        return { success: true, payment };
    }

    refundPayment(transactionId) {
        const payment = this.payments.find(p => p.transactionId === transactionId);
        if (!payment) return { success: false, error: 'Payment not found' };
        payment.status = 'refunded';
        payment.refundDate = new Date().toISOString();
        return { success: true, payment };
    }

    getPaymentDetails(transactionId) {
        const payment = this.payments.find(p => p.transactionId === transactionId);
        return payment ? { success: true, payment } : { success: false, error: 'Payment not found' };
    }
}

module.exports = PaymentProcessor;