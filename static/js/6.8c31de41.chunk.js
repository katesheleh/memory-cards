(this["webpackJsonpmemory-cards"]=this["webpackJsonpmemory-cards"]||[]).push([[6],{147:function(e,r,t){e.exports={container:"RestorePassword_container__3FtFz",inputWrapper:"RestorePassword_inputWrapper__2hddw",errorMsg:"RestorePassword_errorMsg__1XU_O"}},151:function(e,r,t){"use strict";t.r(r);var a=t(0),n=t.n(a),i=t(147),l=t.n(i),s=t(7),o=t(103),c=t(91),m=t(64),u=t(15),d=t(69),p=function(){return d.a({email:d.b().email("Invalid email address").required("Required")})};r.default=n.a.memo((function(){var e=Object(s.b)(),r=Object(s.c)((function(e){return e.restorePsw.success})),t=Object(s.c)((function(e){return e.restorePsw.selectedEmail})),a=Object(s.c)((function(e){return e.request.error})),i=Object(c.a)({initialValues:{email:""},validationSchema:p,onSubmit:function(r){e(Object(o.a)(r.email))}});return n.a.createElement("div",{className:l.a.container},n.a.createElement("h1",null,"Restore password"),a&&n.a.createElement("p",null,n.a.createElement("strong",null,a)),r&&n.a.createElement("div",{style:{color:"green",marginBottom:"10px"}},"Check your email:"," ",n.a.createElement("a",{href:"mailto:".concat(t)},t)," ","and follow the link in there"),n.a.createElement("form",{onSubmit:i.handleSubmit},n.a.createElement("div",{className:l.a.inputWrapper},n.a.createElement(m.a,Object.assign({labelTitle:"Email:",error:i.errors.email},i.getFieldProps("email")))),n.a.createElement(u.a,{type:"submit",labelTitle:"send",disabled:!!i.errors.email})))}))}}]);
//# sourceMappingURL=6.8c31de41.chunk.js.map