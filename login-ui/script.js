document.addEventListener('DOMContentLoaded', function() {
    // Add social login functionality
    setupSocialLogins();
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab content switching
            const tabName = this.getAttribute('data-tab');
            const signinForm = document.getElementById('signin-form');
            const qrcodeForm = document.getElementById('qrcode-form');
            
            if(tabName === 'qrcode') {
                signinForm.style.display = 'none';
                qrcodeForm.style.display = 'block';
            } else {
                signinForm.style.display = 'block';
                qrcodeForm.style.display = 'none';
            }
        });
    });
    
    // Login button click effect
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Show simple success message
            showNotification('Login successful!', 'success');
        });
    }
    
    // Create account link
    const createAccountBtn = document.querySelector('.create-account-btn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://authenticate.riotgames.com/?region=ph&locale=en';
        });
    }
    
    // Can't sign in link
    const helpLink = document.querySelector('.help-link');
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'https://recovery.riotgames.com/en?region=ph';
        });
    }
});

// Show notification with light theme styling
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.notification');
    
    if(!notification) {
        notification = document.createElement('div');
        notification.classList.add('notification');
        document.body.appendChild(notification);
        
        // Add styles for notification with light theme
        const style = document.createElement('style');
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: bold;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .notification.success {
                background-color: #4CAF50;
            }
            
            .notification.error {
                background-color: #F44336;
            }
            
            .notification.info {
                background-color: #2196F3;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Set notification content and type
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Setup all social login functionalities
function setupSocialLogins() {
    // Setup Facebook login
    setupFacebookLogin();
    
    // Setup Google login
    const googleBtn = document.querySelector('.social-btn.google');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            handleSocialLogin(this, 'https://accounts.google.com/signin');
        });
    }
    
    // Setup Apple login
    const appleBtn = document.querySelector('.social-btn.apple');
    if (appleBtn) {
        appleBtn.addEventListener('click', function() {
            handleSocialLogin(this, 'https://appleid.apple.com/sign-in');
        });
    }
    
    // Setup Xbox login
    const xboxBtn = document.querySelector('.social-btn.xbox');
    if (xboxBtn) {
        xboxBtn.addEventListener('click', function() {
            handleSocialLogin(this, 'https://login.live.com/login.srf');
        });
    }
    
    // Setup PlayStation login
    const playstationBtn = document.querySelector('.social-btn.playstation');
    if (playstationBtn) {
        playstationBtn.addEventListener('click', function() {
            handleSocialLogin(this, 'https://my.account.sony.com/sonyacct/signin/?duid=0000000700090100c971df17a3988742662a09042e6b030f7d1b75a6ceebd7182671cd7df8872d79&response_type=code&client_id=e4a62faf-4b87-4fea-8565-caaabb3ac918&scope=web%3Acore&access_type=offline&state=37f612041e8803c07828d3ae9f3ca2362a784c5a257ca655fde4776de75649ef&service_entity=urn%3Aservice-entity%3Apsn&ui=pr&smcid=web%3Apdc&redirect_uri=https%3A%2F%2Fweb.np.playstation.com%2Fapi%2Fsession%2Fv1%2Fsession%3Fredirect_uri%3Dhttps%253A%252F%252Fio.playstation.com%252Fcentral%252Fauth%252Flogin%253Flocale%253Den_IN%2526postSignInURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-in%25252F%2526cancelURL%253Dhttps%25253A%25252F%25252Fwww.playstation.com%25252Fen-in%25252F%26x-psn-app-ver%3D%2540sie-ppr-web-session%252Fsession%252Fv5.40.1&auth_ver=v3&error=login_required&error_code=4165&error_description=User+is+not+authenticated&no_captcha=true&cid=8f8f6091-87c5-4210-a080-76c8b765726b#/signin/input/id');
        });
    }
}

// Generic handler for social logins without animations
function handleSocialLogin(button, loginUrl) {
    // Redirect to login URL
    window.location.href = loginUrl;
}

// Setup Facebook login functionality
function setupFacebookLogin() {
    const facebookBtn = document.getElementById('facebook-login');
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            handleSocialLogin(this, 'https://www.facebook.com/login.php');
        });
    }
} 