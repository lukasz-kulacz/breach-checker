async function sha1(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

document.getElementById("check-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const resultEl = document.getElementById("result");
  const password = document.getElementById("password").value;

  resultEl.textContent = "Sprawdzanie...";

  const hashedPassword = await sha1(password);

  try {
    const response = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "hash" : hashedPassword }),
    });

    if (!response.ok) {
      resultEl.textContent = "Błąd usługi check.";
      return;
    }

    const data = await response.json();
    resultEl.textContent = data.compromised
      ? "To hasło znajduje się w bazie wycieków."
      : "Nie znaleziono tego hasła w bazie wycieków.";
  } catch (err) {
    resultEl.textContent = "Nie udało się połączyć z usługą check.";
  }

});


// document.getElementById("check-form").addEventListener("submit", function (e) {
//   e.preventDefault();
//   document.getElementById("result").textContent =
//     "Logika sprawdzania zostanie podłączona w kolejnych laboratoriach.";
// });