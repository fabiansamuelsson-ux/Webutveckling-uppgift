function getStoredData() {
    try {
        localStorage.setItem('__profile_test', '1');
        localStorage.removeItem('__profile_test');
        return {
            getItem: key => localStorage.getItem(key),
            setItem: (key, value) => localStorage.setItem(key, value)
        };
    } catch (error) {
        return {
            getItem: key => {
                try {
                    const data = JSON.parse(window.name || '{}');
                    return data[key] || null;
                } catch (e) {
                    return null;
                }
            },
            setItem: (key, value) => {
                try {
                    const data = JSON.parse(window.name || '{}');
                    data[key] = value;
                    window.name = JSON.stringify(data);
                } catch (e) {
                    window.name = JSON.stringify({ [key]: value });
                }
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const storage = getStoredData();
    const profileImg = document.querySelector('.profile-img');
    const usernameDisplay = document.getElementById('username-display');

    if (profileImg) {
        const savedImage = storage.getItem('profileImage');
        if (savedImage) {
            profileImg.src = savedImage;
        }
    }

    if (usernameDisplay) {
        const savedName = storage.getItem('profileUsername');
        if (savedName) {
            usernameDisplay.textContent = savedName;
        }
    }
});