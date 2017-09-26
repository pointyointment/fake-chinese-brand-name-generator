// Go to https://www.banggood.com/brands.html and copy and paste the below code (down to line 55, getBrandURLs();) into your console
// You may have to adjust delay

var alphabet = document.getElementsByClassName("street_brand_sort")[0].children;
//alphabet.shift();  // rm "Popular"

var brandURLs = [];

function getBrandURLs() {
    var i = 1;  // Logically, 0 (Popular) should be skipped and 1 (A) has already been clicked, so this should be 2 because that's the one that gets clicked after the first iteration of the letter loop, but i is going to be incremented by the if statement, so it needs to start at 1
    var alphabetLength = alphabet.length;
    var delay = 3000;
    function getBrandsForLetter() {
        //console.log("alphabet[i]:", alphabet[i

        // Get the brand elements for this letter
        var brandsForLetter = Array.from(document.getElementsByClassName("street_brand_show")[0].children[0].children);

        // Get the URL from each brand element
        var brandURLsForLetter = Array.from(brandsForLetter).map(function(brand) {var url = brand.children[0].getAttribute("href"); return url});
        console.log("brandURLsForLetter:", brandURLsForLetter.map(function(brandURL) {return brandURL.substring(32, brandURL.length - 11)}));  // pretty print the names out of the URLs (not reliable enough for scraping the names, but good enough for debugging)

        // https://www.banggood.com/brands-ZOP-Power-b-805.html

        // Put these brand URLs into the brand URLs array
        Array.prototype.push.apply(brandURLs, brandURLsForLetter);

        // If there are more letters (i < alphabetLength), call this function again after a delay. ++i because if i is incremented after comparison it will run in the i = alphabetLength case, which is bad.
        if (++i < alphabetLength) {
            console.log("i:", i);
            // Click the tab for the next letter
            alphabet[i].click();

            // console.log("setting timeout of", delay,
            //             "for", "  ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i],
            //             "(", alphabet[i], ")"
            //            );
            console.log("setting timeout of", delay,
                        "for", alphabet[i].innerHTML,
                        "(", alphabet[i], ")"
                       );
            window.setTimeout(function(){getBrandsForLetter()}, delay);
        }
    }

    // If we're not on tab A already it will need time to load
    alphabet[1].click();
    console.log("setting timeout of", delay,
                "for", "pABCDEFGHIJKLMNOPQRSTUVWXYZ"[1],
                "(", alphabet[1], ")"
               );
    window.setTimeout(function(){getBrandsForLetter()}, delay);
}

getBrandURLs();


// When that is done, run the below code and copy the result

brandNames =
brandURLs.map(function(brandURL) {
    brandURL = brandURL.substring(32).replace(/-b-[\d]*\.html/i, "").replace(/-/g, " ");
    return brandURL;
})
console.log(brandNames.join());
