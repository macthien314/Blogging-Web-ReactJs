"use strict";(self.webpackChunkblogproject=self.webpackChunkblogproject||[]).push([[135],{5456:function(e,n,r){r.d(n,{Y:function(){return i}});r(2791);var t=r(184),a=r(1413),s=r(4925),l=r(1134),o=["checked","children","control","name"],i=function(e){var n=e.checked,r=e.children,i=e.control,c=e.name,d=(0,s.Z)(e,o),u=(0,l.bc)({control:i,name:c,defaultValue:""}).field;return(0,t.jsxs)("label",{children:[(0,t.jsx)("input",(0,a.Z)((0,a.Z)({checked:n,type:"radio",className:"hidden-input"},u),d)),(0,t.jsxs)("div",{className:"flex items-center gap-x-3 font-medium cursor-pointer",children:[(0,t.jsx)("div",{className:"w-7 h-7 rounded-full border flex items-center justify-center p-1  ".concat(n?"bg-primary border-primary text-white":"border-gray-200 text-transparent"),children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 13l4 4L19 7"})})}),(0,t.jsx)("span",{children:r})]})]})}},6356:function(e,n,r){var t,a=r(168),s=(r(2791),r(6444)),l=r(184),o=s.ZP.div(t||(t=(0,a.Z)(["\n\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    row-gap: 10px;\n    margin-bottom: 25px;\n"])));n.Z=function(e){var n=e.children;return(0,l.jsx)(o,{children:n})}},3330:function(e,n,r){r.d(n,{g:function(){return t.Z},Y:function(){return s}});var t=r(6356),a=(r(2791),r(184)),s=function(e){var n=e.children;return(0,a.jsx)("div",{className:"flex flex-wrap gap-5",children:n})}},2441:function(e,n,r){var t=r(1413),a=r(4925),s=r(2791),l=r(184),o=["name","className","progress","image","handleDeleteImage"];n.Z=function(e){var n=e.name,r=e.className,i=void 0===r?"":r,c=e.progress,d=void 0===c?0:c,u=e.image,m=void 0===u?"":u,h=e.handleDeleteImage,p=void 0===h?function(){}:h,x=(0,a.Z)(e,o);return(0,l.jsxs)("label",{className:"cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ".concat(i," relative overflow-hidden group"),children:[(0,l.jsx)("input",(0,t.Z)({type:"file",name:n,className:"hidden-input",onChange:function(){}},x)),0!==d&&!m&&(0,l.jsx)("div",{className:"loading w-16 h-16 border-8 border-green-500 border-t-transparent animate-spin absolute z-10 rounded-full"}),!m&&0===d&&(0,l.jsxs)("div",{className:"flex flex-col items-center text-center pointer-events-none",children:[(0,l.jsx)("img",{src:"/img-upload.png",alt:"upload-img",className:"max-w-[80px] mb-5"}),(0,l.jsx)("p",{className:"font-semibold",children:"Choose photo"})]}),m&&(0,l.jsxs)(s.Fragment,{children:[(0,l.jsx)("img",{src:m,className:"w-full h-full object-cover",alt:""}),(0,l.jsx)("button",{type:"button",className:"w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible",onClick:p,children:(0,l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:(0,l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})]}),!m&&(0,l.jsx)("div",{className:"absolute w-10 h-1 bg-green-400 bottom-0 left-0 transition-all image-upload-progress",style:{width:"".concat(Math.ceil(d),"%")}})]})}},9248:function(e,n,r){var t,a=r(1413),s=r(4925),l=r(168),o=(r(2791),r(6444)),i=r(1134),c=r(184),d=["name","type","children","control"],u=o.ZP.div(t||(t=(0,l.Z)(["\n    position: relative;\n    width: 100%;\n    input{\n        width:100%;\n        padding: ",";\n        background-color: transparent;\n        border: 1px solid ",";\n        border-radius: 8px;\n        font-weight:500 ;\n        transition:all 0.2s linear ;\n        color: ",";\n        font-size: 14px;\n    }\n    input::-webkit-input-placeholder{\n        color:#84878b;\n\n    }\n    input::-moz-input-placeholder{\n        color:#84878b;\n    }\n    .input-icon {\n    position: absolute;\n    right: 20px;\n    top: 50%;\n    transform: translateY(-50%);\n    cursor: pointer;\n  }\n"])),(function(e){return e.hasIcon?"15px 60px 15px 25px":"15px 25px"}),(function(e){return e.theme.grayf1}),(function(e){return e.theme.black}));n.Z=function(e){var n=e.name,r=void 0===n?"":n,t=e.type,l=void 0===t?"text":t,o=e.children,m=e.control,h=(0,s.Z)(e,d),p=(0,i.bc)({control:m,name:r,defaultValue:""}).field;return(0,c.jsxs)(u,{hasIcon:!!o,children:[(0,c.jsx)("input",(0,a.Z)((0,a.Z)({id:r,type:l},p),h)),o?(0,c.jsx)("div",{className:"input-icon",children:o}):null]})}},3117:function(e,n,r){r.d(n,{I:function(){return t.Z}});var t=r(9248)},6848:function(e,n,r){r.d(n,{_:function(){return m},O:function(){return p}});var t,a,s=r(1413),l=r(4925),o=r(168),i=(r(2791),r(6444)),c=r(184),d=["htmlFor","children"],u=i.ZP.label(t||(t=(0,o.Z)(["\n  color: ",";\n  font-weight: 500;\n  font-size: 14px;\n  cursor: pointer;\n"])),(function(e){return e.theme.gray4b})),m=function(e){var n=e.htmlFor,r=void 0===n?"":n,t=e.children,a=(0,l.Z)(e,d);return(0,c.jsx)(u,(0,s.Z)((0,s.Z)({htmlFor:r},a),{},{children:t}))},h=i.ZP.span(a||(a=(0,o.Z)(["\n  display: inline-block;\n  padding: 10px 15px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n"]))),p=function(e){var n=e.children,r=e.type,t="text-gray-500 bg-gray-100";switch(void 0===r?"default":r){case"success":t="text-green-500 bg-green-100";break;case"warning":t="text-orange-500 bg-orange-100";break;case"danger":t="text-red-500 bg-red-100"}return(0,c.jsx)(h,{className:t,children:n})}},1776:function(e,n,r){r.d(n,{Z:function(){return l}});var t=r(9439),a=r(4453),s=r(2791);function l(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=(0,s.useState)(0),i=(0,t.Z)(o,2),c=i[0],d=i[1],u=(0,s.useState)(""),m=(0,t.Z)(u,2),h=m[0],p=m[1];if(e&&n){var x=function(n){var r=n.target.files[0];console.log(r),r&&(e("image_name",r.name),f(r))},f=function(e){var n=(0,a.cF)(),r=(0,a.iH)(n,"images/"+e.name),t=(0,a.B0)(r,e);t.on("state_changed",(function(e){var n=e.bytesTransferred/e.totalBytes*100;switch(d(n),console.log("Upload is "+c+"% done"),e.state){case"paused":console.log("Upload is paused");break;case"running":console.log("Upload is running");break;default:console.log("Nothing at all")}}),(function(e){console.log(e)}),(function(){(0,a.Jt)(t.snapshot.ref).then((function(e){console.log("File available at",e),p(e)}))}))},g=function(){var e=(0,a.cF)(),t=(0,a.iH)(e,"images/"+(r||n("image_name")));(0,a.oq)(t).then((function(){console.log("Remove image successfully"),p(""),d(0)})).catch((function(e){console.log("handleDeleteImage ~ error",e),console.log("Can not delete image")}))},v=function(){p(""),d(0),l&&l()};return{image:h,handleResetUpload:v,setImage:p,progress:c,handleDeleteImage:g,handleSelectImage:x}}}},8322:function(e,n,r){r(2791);var t=r(184);n.Z=function(e){var n=e.title,r=void 0===n?"":n,a=e.desc,s=void 0===a?"":a,l=e.children;return(0,t.jsxs)("div",{className:"mb-10 flex items-start justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{className:"dashboard-heading",children:r}),(0,t.jsx)("p",{className:"dashboard-short-desc",children:s})]}),l]})}},2135:function(e,n,r){r.r(n);var t=r(4165),a=r(5861),s=r(385),l=r(5456),o=r(3330),i=r(3117),c=r(6848),d=r(8322),u=(r(2791),r(1134)),m=r(2441),h=r(3585),p=r(1776),x=r(9257),f=r(1199),g=r(9062),v=r(333),b=r.n(v),j=r(9085),w=r(184);n.default=function(){var e=(0,u.cI)({mode:"onChange",defaultValues:{fullname:"",email:"",password:"",username:"",avatar:"",status:h.iQ.ACTIVE,role:h.xZ.USER,createdAt:new Date}}),n=e.control,r=e.handleSubmit,v=e.setValue,N=e.watch,Z=e.getValues,y=e.formState,k=y.isValid,I=y.isSubmitting,A=e.reset,C=N("status"),E=N("role"),D=(0,p.Z)(v,Z),S=D.image,U=D.handleResetUpload,Y=D.progress,V=D.handleSelectImage,_=D.handleDeleteImage,L=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(k){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,(0,x.Xb)(f.I,n.email,n.password);case 5:return e.next=7,(0,g.ET)((0,g.hJ)(f.db,"users"),{fullname:n.fullname,email:n.email,password:n.password,username:b()(n.username||n.fullname,{lower:!0,replacement:" ",trim:!0}),avatar:S,status:Number(n.status),role:Number(n.role),createdAt:(0,g.Bt)()});case 7:j.Am.success("Create new user with email: ".concat(n.email," successfully!")),A({fullname:"",email:"",password:"",username:"",avatar:"",status:h.iQ.ACTIVE,role:h.xZ.USER,createdAt:new Date}),U(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),j.Am.error("Can not create new user");case 15:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(n){return e.apply(this,arguments)}}();return(0,w.jsxs)("div",{children:[(0,w.jsx)(d.Z,{title:"New user",desc:"Add new user to system"}),(0,w.jsxs)("form",{onSubmit:r(L),children:[(0,w.jsx)("div",{className:"w-[200px] h-[200px] mx-auto rounded-full mb-10",children:(0,w.jsx)(m.Z,{image:S,onChange:V,className:"!rounded-full h-full",progress:Y,handleDeleteImage:_})}),(0,w.jsxs)("div",{className:"form-layout",children:[(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Fullname"}),(0,w.jsx)(i.I,{name:"fullname",placeholder:"Enter your fullname",control:n})]}),(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Username"}),(0,w.jsx)(i.I,{name:"username",placeholder:"Enter your username",control:n})]})]}),(0,w.jsxs)("div",{className:"form-layout",children:[(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Email"}),(0,w.jsx)(i.I,{name:"email",placeholder:"Enter your email",control:n,type:"email"})]}),(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Password"}),(0,w.jsx)(i.I,{name:"password",placeholder:"Enter your password",control:n,type:"password"})]})]}),(0,w.jsxs)("div",{className:"form-layout",children:[(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Status"}),(0,w.jsxs)(o.Y,{children:[(0,w.jsx)(l.Y,{name:"status",control:n,checked:Number(C)===h.iQ.ACTIVE,value:h.iQ.ACTIVE,children:"Active"}),(0,w.jsx)(l.Y,{name:"status",control:n,checked:Number(C)===h.iQ.PENDING,value:h.iQ.PENDING,children:"Pending"}),(0,w.jsx)(l.Y,{name:"status",control:n,checked:Number(C)===h.iQ.BAN,value:h.iQ.BAN,children:"Banned"})]})]}),(0,w.jsxs)(o.g,{children:[(0,w.jsx)(c._,{children:"Role"}),(0,w.jsxs)(o.Y,{children:[(0,w.jsx)(l.Y,{name:"role",control:n,checked:Number(E)===h.xZ.ADMIN,value:h.xZ.ADMIN,children:"Admin"}),(0,w.jsx)(l.Y,{name:"role",control:n,checked:Number(E)===h.xZ.MOD,value:h.xZ.MOD,children:"Moderator"}),(0,w.jsx)(l.Y,{name:"role",control:n,checked:Number(E)===h.xZ.USER,value:h.xZ.USER,children:"User"})]})]})]}),(0,w.jsx)(s.z,{type:"submit",kind:"primary",className:"mx-auto w-[200px]",isLoading:I,disabled:I,children:"Add new user"})]})]})}}}]);
//# sourceMappingURL=135.fb2375e5.chunk.js.map