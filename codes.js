function checkCode() {
  const allowedCodes = ["666001", "666002", "666003"];
  const enteredCode = document.getElementById("codeInput").value.trim();

  if (allowedCodes.includes(enteredCode)) {
    window.location.href = "page4.html";
  } else {
    alert("⚠️ الكود غير صحيح");
  }
}
