// إدارة المستخدم عبر LocalStorage
window.Auth = (function(){
  const KEY = "matrix_auth_v1";

  function saveUser(obj){
    try{
      const data = {
        username: obj.username?.trim() || "مستخدم",
        xp: Number(obj.xp || 0),
        remember: !!obj.remember,
        timestamp: Date.now()
      };
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch(e){
      return false;
    }
  }

  function loadUser(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return null;
      return JSON.parse(raw);
    } catch(e){
      return null;
    }
  }

  function clear(){
    try{ localStorage.removeItem(KEY); } catch(e){}
  }

  return { saveUser, loadUser, clear, KEY };
})();
