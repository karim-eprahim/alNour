import{b4 as a,G as r,n as e}from"./AS5pgP4T.js";const u=a(()=>{const t=r();if(!t.isAuthenticated)return e("/auth/login");if(t.userRole!=="DISTRIBUTOR")return e("/dashboard")});export{u as default};
