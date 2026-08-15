import{b0 as a,G as r,n as e}from"./DqdGStjY.js";const u=a(()=>{const t=r();if(!t.isAuthenticated)return e("/auth/login");if(t.userRole!=="DISTRIBUTOR")return e("/dashboard")});export{u as default};
