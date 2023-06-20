const functions = require("firebase-functions");
const paypal = require("@paypal/checkout-server-sdk");
const cors = require('cors')
const admin = require('firebase-admin');
const { user } = require("firebase-functions/v1/auth");
admin.initializeApp();

const corsHandler = cors({origin: true});

const clientId = functions.config().paypal.client_id;
const clientSecret = functions.config().paypal.client_secret;

const environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

exports.createOrder = functions.https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
        if(!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
            response.status(403).json({error: 'Unauthorized'});
            return;
        }
        const idToken = request.headers.authorization.split('Bearer ')[1];

        try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "5.99"
                    }
                }
            ]
        });
        
            const order = await client.execute(request);
            console.log(order.result.id);
            return response.status(200).json({ orderID: order.result.id });

        } catch (err) {
            console.error('Error executing createOrder:', err);
            return response.status(500).json({error: err.message}); 
        }  
    });
});

exports.captureOrder = functions.https.onRequest((request, response) => {
    corsHandler(request, response, async () => {
        if(!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
            response.status(403).json({error: 'Unauthorized'});
            return;
        }
        const idToken = request.headers.authorization.split('Bearer ')[1];

        try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        const orderID = request.body.orderID;
        console.log(orderID)
        if (!orderID) {
            // console.log('Missing orderId in request body');
            return response.status(400).json({ error: 'Missing orderId in request body' });
        }

        const captureRequest = new paypal.orders.OrdersCaptureRequest(orderID);
            const order = await client.execute(captureRequest);
            return response.status(200).json(order);
        } catch (err) {
            console.error('Error executing captureRequest:', err);
            return response.status(500).json({ error: err.message });
        }
    });
});

exports.updatePaymentStatus = functions.https.onCall(async (data, context) => {
    const userId = data.userId;
    const hasPaid = data.hasPaid;
    console.log(userId)
    console.log(hasPaid)

    if (!(typeof userId === 'string') || userId.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one argument "userId" containing the id of the user to update.');
    }

    if (!(typeof hasPaid === 'boolean')) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one argument "hasPaid" containing a boolean value to update.');
    }

    const userDocRef = admin.firestore().collection('users').doc(userId);
    const userDocSnap = await userDocRef.get();
    if (!userDocSnap.exists) {
        throw new functions.https.HttpsError('not-found', 'The user document does not exist.');
    }

    return userDocRef.update({
        hasPaid: hasPaid
    }).then(() => {
        return {
            message: 'Updated payment status successfully'
        };
    }).catch(error => {
        console.error("Error updating payment status: ", error);
        throw new functions.https.HttpsError('unknown', 'Failed to update payment status', error);
    });

});

// sb-n0n3p25093616@personal.example.com
// B*?r5)8V