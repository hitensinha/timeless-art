var API_URL = "https://api.timelessart.io/api/timelessart/marketPlace";

$(document).ready(function () {
    bindMarketPlaceListing(API_URL);
});

function bindMarketPlaceListing(api_url) {
    StartLoading();
    $.get(api_url, function (response) {
        console.log("API response=", response);
        if (response && response.response_data) {
            var arts_list = response.response_data;

            if (arts_list.length > 0) {

                var finalHTML = "";

                arts_list.forEach(function (item, index) {

                    var artId = item.artId;
                    var artName = item.artName;
                    var artImage = item.primaryImage;
                    var creator = item.creator;
                    var currencySymbol = item.currencySymbol;
                    var artListingPrice = item.artListingPrice;
                    var conversionRate = item.conversionRate;
                    var externalLink = item.externalLink;
                    var userType = item.userType;
                    var svgIcon = getSVGIcon(userType);

                    var artical = getArtColumnHTML();
                    artical = artical.replace("#ART_NAME#", artName);
                    artical = artical.replace("#ART_IMAGE#", artImage);
                    artical = artical.replace("#CREATOR#", creator);
                    artical = artical.replace("#METAVERSE_LINK#", externalLink);
                    artical = artical.replace("#SELL_AMOUNT#", currencySymbol + artListingPrice);
                    artical = artical.replace("#MRP_AMOUNT#", "$" + conversionRate);
                    artical = artical.replace("#SVG_ICON#", svgIcon);

                    finalHTML += artical;
                });

                $(".all-art__wrap").removeAttr("style");
                $(".all-art__wrap").html(finalHTML);

            }
            else {
                $(".all-art__wrap").removeAttr("style");
                $(".all-art__wrap").css("height", "100%");

                var noDataHTML = "<h3 style='text-align: center; width: 100%; position: relative; top: 50%;'>No Data Found !!</h3>";                
                $(".all-art__wrap").html(noDataHTML);
            }

            StopLoading();
        }
        else {
            StopLoading();
        }

    });
}

$(document).on("click", ".filter", function () {
    filterData();
});

$(document).on("change", "#Price-Min, #Price-Max", function () {

    var minPrice = $('#Price-Min').val();
    var maxPrice = $('#Price-Max').val();

    // Validation
    if (minPrice && maxPrice) {
        if (parseFloat(minPrice) > parseFloat(maxPrice)) {
            alert("Invalid price range");
            return false;
        }
    }

    if ((minPrice && maxPrice) || (!minPrice && !maxPrice))
        filterData();
});

function filterData() {

    var filtered_api_url = API_URL;
    var param_filter = "";

    /* Browse by Category - Start */
    var chkPhysical = $('.main_category #chkPhysical:checked').val();
    var chkDigital = $('.main_category #chkDigital:checked').val();

    if (chkPhysical || chkDigital) {
        var str = "";
        if (chkPhysical) {
            str += chkPhysical;
        }
        if (chkDigital) {
            str += str ? "," + chkDigital : chkDigital;
        }

        param_filter = "?artType=" + str;
    }

    /* Browse by Category - End */

    /* Price Range - Start */

    var minPrice = $('#Price-Min').val();
    var maxPrice = $('#Price-Max').val();

    if (minPrice && maxPrice) {
        var sign = param_filter ? "&" : "?";
        param_filter += sign + "pricemin=" + minPrice + "&pricemax=" + maxPrice;
    }

    /* Price Range - End */

    /* Artist Category - Start */
    var chkElite = $('#chkElite:checked').val();
    var chkEstablished = $('#chkEstablished:checked').val();
    var chkEmerging = $('#chkEmerging:checked').val();

    if (chkElite || chkEstablished || chkEmerging) {
        var str = "";
        if (chkElite) {
            str += chkElite;
        }

        if (chkEstablished) {
            str += str ? "," + chkEstablished : chkEstablished;
        }

        if (chkEmerging) {
            str += str ? "," + chkEmerging : chkEmerging;
        }

        var sign = param_filter ? "&" : "?";
        param_filter += sign + "artistCategory=" + str;
    }

    /* Artist Category - End */

    /* Art Form - Start */

    var chkDrawing = $('#chkDrawing:checked').val();
    var chkPainting = $('#chkPainting:checked').val();
    var chkSculpture = $('#chkSculpture:checked').val();
    var chkPhotography = $('#chkPhotography:checked').val();

    if (chkDrawing || chkPainting || chkSculpture || chkPhotography) {
        var str = "";
        if (chkDrawing) {
            str += chkDrawing;
        }

        if (chkPainting) {
            str += str ? "," + chkPainting : chkPainting;
        }

        if (chkSculpture) {
            str += str ? "," + chkSculpture : chkSculpture;
        }

        if (chkPhotography) {
            str += str ? "," + chkPhotography : chkPhotography;
        }

        var sign = param_filter ? "&" : "?";
        param_filter += sign + "artCategory=" + str;
    }

    /* Art Form - End */

    /* Medium - Start */

    var chkAcrylic = $('#chkAcrylic:checked').val();
    var chkOil = $('#chkOil:checked').val();
    var chkPastels = $('#chkPastels:checked').val();
    var chkGraphite = $('#chkGraphite:checked').val();
    var chkInk = $('#chkInk:checked').val();

    var chkClay = $('#chkClay:checked').val();
    var chkMulti = $('#chkMulti:checked').val();
    var chkCharcoal = $('#chkCharcoal:checked').val();
    var chkPhoto = $('#chkPhoto:checked').val();
    var chkWatercolors = $('#chkWatercolors:checked').val();

    if (chkAcrylic || chkOil || chkPastels || chkGraphite || chkInk || chkClay || chkMulti || chkCharcoal || chkPhoto || chkWatercolors) {

        var str = "";
        if (chkAcrylic) {
            str += chkAcrylic;
        }

        if (chkOil) {
            str += str ? "," + chkOil : chkOil;
        }

        if (chkPastels) {
            str += str ? "," + chkPastels : chkPastels;
        }

        if (chkGraphite) {
            str += str ? "," + chkGraphite : chkGraphite;
        }

        if (chkInk) {
            str += str ? "," + chkInk : chkInk;
        }

        if (chkClay) {
            str += str ? "," + chkClay : chkClay;
        }

        if (chkMulti) {
            str += str ? "," + chkMulti : chkMulti;
        }

        if (chkCharcoal) {
            str += str ? "," + chkCharcoal : chkCharcoal;
        }

        if (chkPhoto) {
            str += str ? "," + chkPhoto : chkPhoto;
        }

        if (chkWatercolors) {
            str += str ? "," + chkWatercolors : chkWatercolors;
        }

        var sign = param_filter ? "&" : "?";
        param_filter += sign + "medium=" + str;
    }

    /* Medium - End */

    filtered_api_url += param_filter;

    console.log("filtered_api_url=", filtered_api_url);
    bindMarketPlaceListing(filtered_api_url);

}

function getArtColumnHTML() {
    var htmlData = '';
    htmlData += '';

    htmlData += '<div class="art__item">';
    htmlData += '<img src="#ART_IMAGE#" style="width:200px; height: 200px;" loading="lazy" sizes="(max-width: 479px) 83vw, 200px" alt="Art Image" class="art__image" />';
    htmlData += '<div class="art__info">';
    htmlData += '<h3 class="art__title" style="width:160px; height: 60px;">#ART_NAME#</h3>';
    htmlData += '<div>';
    htmlData += '<h3 class="artist__name under-art">#CREATOR#</h3>';
    htmlData += '<img src="#SVG_ICON#" loading="lazy" width="17" alt="" class="artist__badge under-art" />';
    htmlData += '</div>';
    htmlData += '<div class="art__info-stats">';
    htmlData += '<h4 class="art__info-number">#SELL_AMOUNT#</h4>';
    htmlData += '<div>#MRP_AMOUNT#</div>';
    htmlData += '</div>';
    htmlData += '<div class="art-button-wrap"><a href="#" class="button art-button top w-button">View Art Page</a><a href="#METAVERSE_LINK#" class="button art-button w-button">View in Metaverse</a></div>';
    htmlData += '</div>';
    htmlData += '</div>';

    return htmlData;
}

function getSVGIcon(userType) {
    var icon = "";
    if (userType == "Elite") {
        icon = "https://uploads-ssl.webflow.com/63066914489fb9bc850e1c54/6360a599798bc2837502bdf5_Elite.svg";
    }
    else if (userType == "Established") {
        icon = "https://uploads-ssl.webflow.com/63066914489fb9bc850e1c54/6360a599990398aa5a4bab73_Established.svg";
    }
    else if (userType == "Emerging") {
        icon = "https://uploads-ssl.webflow.com/63066914489fb9bc850e1c54/6360a59912ba460bfbc699de_Emerging.svg";
    }
    return icon;
}

function StartLoading() {
    jQuery.blockUI({ message: "<h4>Please Wait...</h4>" });
}

function StopLoading() {
    jQuery.unblockUI();
}
