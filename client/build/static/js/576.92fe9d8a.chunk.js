"use strict";(self.webpackChunkfootball_app=self.webpackChunkfootball_app||[]).push([[576],{8576:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var r=n(4165),a=n(5861),s=n(9439),i=n(2791),u=n(5764),c=n(184);function o(){var e=(0,u.useStripe)(),t=(0,u.useElements)(),n=(0,i.useState)(""),o=(0,s.Z)(n,2),l=(o[0],o[1]),m=(0,i.useState)(null),p=(0,s.Z)(m,2),f=p[0],d=p[1],h=(0,i.useState)(!1),y=(0,s.Z)(h,2),b=y[0],v=y[1],k=(0,i.useState)(!1),x=(0,s.Z)(k,2),w=x[0],g=x[1];(0,i.useEffect)((function(){if(e){var t=new URLSearchParams(window.location.search).get("payment_intent_client_secret");t&&e.retrievePaymentIntent(t).then((function(e){switch(e.paymentIntent.status){case"succeeded":d("Payment succeeded!");break;case"processing":d("Your payment is processing.");break;case"requires_payment_method":d("Your payment was not successful, please try again.");break;default:d("Something went wrong.")}}))}}),[e]),(0,i.useEffect)((function(){e&&g(!0)}),[e]);var _=function(){var n=(0,a.Z)((0,r.Z)().mark((function n(a){var s,i;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a.preventDefault(),e&&t){n.next=3;break}return n.abrupt("return");case 3:return v(!0),n.next=6,e.confirmPayment({elements:t,confirmParams:{return_url:"https://football-tank.site"}});case 6:s=n.sent,"card_error"===(i=s.error).type||"validation_error"===i.type?d(i.message):d("An unexpected error occurred."),v(!1);case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,c.jsx)("div",{className:"checkout-form",children:w&&(0,c.jsxs)("form",{id:"payment-form",onSubmit:_,children:[(0,c.jsx)(u.LinkAuthenticationElement,{id:"link-authentication-element",onChange:function(e){return l(e.target.value)}}),(0,c.jsx)(u.PaymentElement,{id:"payment-element",options:{layout:"tabs"}}),(0,c.jsx)("button",{disabled:b||!e||!t,id:"submit",children:(0,c.jsx)("span",{id:"button-text",children:b?(0,c.jsx)("div",{className:"spinner",id:"spinner"}):"Pay now"})}),f&&(0,c.jsx)("div",{id:"payment-message",children:f})]})})}}}]);
//# sourceMappingURL=576.92fe9d8a.chunk.js.map