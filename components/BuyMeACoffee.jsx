import React from 'react';


const BuyMeACoffee = () => {
    const bmcHtml = `
        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" 
            data-name="bmc-button" 
            data-slug="yoni7022" 
            data-color="#FFDD00" 
            data-emoji="🍕" 
            data-font="Comic" 
            data-text="Buy me a pizza" 
            data-outline-color="#000000" 
            data-font-color="#000000" 
            data-coffee-color="#ffffff">
        </script>`;

    return (
        <div style={{ transform: "scale(1)", transformOrigin: "0 0" }}>
            <iframe title="Buy Me a Coffee"  className='bmc'
                srcDoc={bmcHtml} 
                width="300px" 
                height="71px" 
                style={{border: 'none', overflow: 'hidden'}} 
                scrolling="no" 
                frameBorder="0" 
                allowTransparency="true" 
                allow="encrypted-media">
                
            </iframe>
        </div>
    );
};

export default BuyMeACoffee;