(this["webpackJsonpmemory-cards"]=this["webpackJsonpmemory-cards"]||[]).push([[5],{166:function(e,a,r){e.exports={container:"Registration_container__22uK_",formItem:"Registration_formItem__Rlh6d"}},170:function(e,a,r){"use strict";r.r(a);var t=r(0),s=r.n(t),i=r(166),n=r.n(i),l=r(10),o=r(4),m=r(8),c=r(115),d=r(102),u=r(39),b=r(5),p=r(75),w=function(){return p.a({email:p.b().email("Invalid email address").required("Required"),password:p.b().required("Required").min(8,"Must be 8 characters or less"),repeatPassword:p.b().required("Required").min(8,"Must be 8 characters or less")})};a.default=s.a.memo((function(){var e=Object(o.c)((function(e){return e.registration.isRegistered})),a=Object(o.c)((function(e){return e.request.error})),r=Object(o.b)(),t=Object(d.a)({initialValues:{email:"",password:"",repeatPassword:""},validationSchema:w,onSubmit:function(e){var a={email:e.email,password:e.password};r(Object(c.b)(a))}});return e?s.a.createElement(l.a,{to:m.b}):s.a.createElement("div",{className:n.a.container},a&&s.a.createElement("p",null,s.a.createElement("strong",null,a)),s.a.createElement("h1",null,"Registration"),s.a.createElement("form",{onSubmit:t.handleSubmit},s.a.createElement("div",{className:n.a.formItem},s.a.createElement(u.a,Object.assign({labelTitle:"Email address",error:t.errors.email},t.getFieldProps("email")))),s.a.createElement("div",{className:n.a.formItem},s.a.createElement(u.a,Object.assign({labelTitle:"Password",type:"password",error:t.errors.password},t.getFieldProps("password")))),s.a.createElement("div",{className:n.a.formItem},s.a.createElement(u.a,Object.assign({labelTitle:"Repeat Password",type:"password",error:t.errors.repeatPassword},t.getFieldProps("repeatPassword")))),s.a.createElement(b.a,{labelTitle:"Submit",type:"submit",disabled:t.values.password!==t.values.repeatPassword})))}))}}]);
//# sourceMappingURL=5.2a8a5114.chunk.js.map