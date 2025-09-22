package com.healthbridge.service;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class PaymentService {
    
    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;
    
    private RazorpayClient razorpayClient;
    
    public PaymentService(@Value("${razorpay.key.id}") String keyId, 
                         @Value("${razorpay.key.secret}") String keySecret) {
        try {
            this.razorpayKeyId = keyId;
            this.razorpayKeySecret = keySecret;
            this.razorpayClient = new RazorpayClient(keyId, keySecret);
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to initialize Razorpay client", e);
        }
    }
    
    public Map<String, Object> createOrder(Double amount, String currency, String receipt) throws RazorpayException {
        try {
            System.out.println("=== RAZORPAY CREATE ORDER DEBUG ===");
            System.out.println("Amount: " + amount);
            System.out.println("Currency: " + currency);
            System.out.println("Receipt: " + receipt);
            System.out.println("Razorpay Key ID: " + razorpayKeyId);
            System.out.println("Razorpay Secret: " + (razorpayKeySecret != null ? "***" + razorpayKeySecret.substring(razorpayKeySecret.length() - 4) : "null"));
            
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", Math.round(amount * 100)); // Convert to paise
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", receipt);
            
            System.out.println("Order request: " + orderRequest.toString());
            Order order = razorpayClient.orders.create(orderRequest);
            System.out.println("Order created successfully: " + order.get("id"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("receipt", order.get("receipt"));
            response.put("status", order.get("status"));
            response.put("keyId", razorpayKeyId);
            
            return response;
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Failed to create Razorpay order: " + e.getMessage());
        }
    }
    
    public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);
            
            return Utils.verifyPaymentSignature(options, razorpayKeySecret);
        } catch (RazorpayException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public Map<String, Object> getPaymentDetails(String paymentId) throws RazorpayException {
        try {
            com.razorpay.Payment payment = razorpayClient.payments.fetch(paymentId);
            
            Map<String, Object> paymentDetails = new HashMap<>();
            paymentDetails.put("id", payment.get("id"));
            paymentDetails.put("amount", payment.get("amount"));
            paymentDetails.put("currency", payment.get("currency"));
            paymentDetails.put("status", payment.get("status"));
            paymentDetails.put("method", payment.get("method"));
            paymentDetails.put("created_at", payment.get("created_at"));
            
            return paymentDetails;
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Failed to fetch payment details: " + e.getMessage());
        }
    }
    
    public String getRazorpayKeyId() {
        return razorpayKeyId;
    }
    
    // Create order for appointment booking
    public Map<String, Object> createAppointmentOrder(Long appointmentId, Double consultationFee, 
                                                    String patientEmail) throws RazorpayException {
        String receipt = "appointment_" + appointmentId + "_" + System.currentTimeMillis();
        
        Map<String, Object> orderData = createOrder(consultationFee, "INR", receipt);
        
        // Add additional metadata
        orderData.put("appointmentId", appointmentId);
        orderData.put("patientEmail", patientEmail);
        orderData.put("description", "Consultation Fee Payment");
        
        return orderData;
    }
    
    // Refund payment (if needed)
    public Map<String, Object> refundPayment(String paymentId, Double amount, String reason) throws RazorpayException {
        try {
            JSONObject refundRequest = new JSONObject();
            if (amount != null) {
                refundRequest.put("amount", Math.round(amount * 100)); // Convert to paise
            }
            if (reason != null) {
                refundRequest.put("notes", new JSONObject().put("reason", reason));
            }
            
            com.razorpay.Refund refund = razorpayClient.payments.refund(paymentId, refundRequest);
            
            Map<String, Object> response = new HashMap<>();
            response.put("refundId", refund.get("id"));
            response.put("amount", refund.get("amount"));
            response.put("status", refund.get("status"));
            response.put("paymentId", refund.get("payment_id"));
            
            return response;
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Failed to process refund: " + e.getMessage());
        }
    }
}
