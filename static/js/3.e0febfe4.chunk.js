(this["webpackJsonpmemory-cards"]=this["webpackJsonpmemory-cards"]||[]).push([[3],{168:function(e,r,s){e.exports={container:"NewPassword_container__MmJpC",inputWrapper:"NewPassword_inputWrapper__RAhym",errorMsg:"NewPassword_errorMsg__1x7cS"}},172:function(e,r,s){"use strict";s.r(r);var a=s(0),t=s.n(a),n=s(10),o=s(168),c=s.n(o),i=s(4),d=s(113),w=s(9),l=s(38),u=s(5),m=s(102),p=s(74),b=function(){return p.a({firstNewPassword:p.b().required("Required").min(8,"Must be 8 characters or less"),secondNewPassword:p.b().required("Required").min(8,"Must be 8 characters or less")})};r.default=t.a.memo((function(){var e=Object(i.b)(),r=Object(n.g)().token,s=Object(i.c)((function(e){return e.newPsw.success})),a=Object(i.c)((function(e){return e.request.error})),o=Object(m.a)({initialValues:{firstNewPassword:"",secondNewPassword:""},validationSchema:b,onSubmit:function(s){e(Object(d.b)(s.firstNewPassword.trim(),r))}});return s?t.a.createElement(n.a,{to:w.b}):t.a.createElement("div",{className:c.a.container},t.a.createElement("h1",null,"New password"),a&&t.a.createElement("p",null,t.a.createElement("strong",null,a)),t.a.createElement("form",{onSubmit:o.handleSubmit},t.a.createElement("div",{className:c.a.inputWrapper},t.a.createElement(l.a,Object.assign({type:"password",labelTitle:"Enter a new password:",error:o.errors.firstNewPassword},o.getFieldProps("firstNewPassword")))),t.a.createElement("div",{className:c.a.inputWrapper},t.a.createElement(l.a,Object.assign({type:"password",labelTitle:"Confirm password:",error:o.errors.secondNewPassword},o.getFieldProps("secondNewPassword")))),t.a.createElement(u.a,{labelTitle:"Send",type:"submit",disabled:o.values.firstNewPassword!==o.values.secondNewPassword||!!o.errors.firstNewPassword||!!o.errors.secondNewPassword},"Send")))}))}}]);
//# sourceMappingURL=3.e0febfe4.chunk.js.map