/* Skript som laddar profilbild och användarnamn vid sidans start */
// Funktion som hanterar lagring av data på ett säkert sätt
function getStoredData() {
    try {
        // Testar om localStorage är tillgängligt och fungerar
        localStorage.setItem('__profile_test', '1');
        localStorage.removeItem('__profile_test');

        // Om testet lyckas används localStorage
        return {
            // Hämtar ett värde från localStorage med en nyckel
            getItem: key => localStorage.getItem(key),

            // Sparar ett värde i localStorage
            setItem: (key, value) => localStorage.setItem(key, value)
        };

    } catch (error) {
        // Om localStorage inte fungerar används window.name som reservlösning
        return {

            // Hämtar sparad data från window.name
            getItem: key => {
                try {
                    // Tolkar lagrad JSON-data eller använder ett tomt objekt
                    const data = JSON.parse(window.name || '{}');

                    // Returnerar värdet om det finns, annars null
                    return data[key] || null;

                } catch (e) {
                    // Returnerar null om något går fel vid tolkningen
                    return null;
                }
            },

            // Sparar data i window.name
            setItem: (key, value) => {
                try {
                    // Läser in tidigare sparad data
                    const data = JSON.parse(window.name || '{}');

                    // Lägger till eller uppdaterar värdet
                    data[key] = value;

                    // Sparar tillbaka datan som en JSON-sträng
                    window.name = JSON.stringify(data);

                } catch (e) {
                    // Om något går fel skapas ett nytt objekt
                    window.name = JSON.stringify({ [key]: value });
                }
            }
        };
    }
}

// Körs när hela HTML-dokumentet har laddats klart
document.addEventListener('DOMContentLoaded', () => {

    // Hämtar lagringshanteraren (localStorage eller reservlösning)
    const storage = getStoredData();

    // Hämtar elementet för profilbilden
    const profileImg = document.querySelector('.profile-img');

    // Hämtar elementet där användarnamnet visas
    const usernameDisplay = document.getElementById('username-display');

    // Uppdaterar profilbilden om elementet finns
    if (profileImg) {

        // Hämtar sparad profilbild
        const savedImage = storage.getItem('profileImage');

        // Om en bild finns sparad uppdateras bildens källa
        if (savedImage) {
            profileImg.src = savedImage;
        }
    }

    // Uppdaterar användarnamnet om elementet finns
    if (usernameDisplay) {

        // Hämtar sparat användarnamn
        const savedName = storage.getItem('profileUsername');

        // Om ett användarnamn finns sparat visas det
        if (savedName) {
            usernameDisplay.textContent = savedName;
        }
    }
});