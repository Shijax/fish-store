const discount = .12;

const applySale = () => {
    $(".on-sale").each((i, domFish) => {
        const fullPrice = $(domFish).find('.price');
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        fullPrice.html(newPrice);
    })
}

const writeFishes = (arrayOfFishes) => {
    let domString = '';
    arrayOfFishes.forEach((fish) => {
        domString += `
        <div class="${fish.onSale ? "on-sale" : ''} fish card col-md-6 col-md-offset-3">
                <div class="thumbnail">
                    <img src="${fish.imageSource}"
                        alt="" width="40%">
                    <div class="caption">
                        <h3 id="thumbnail-label">${fish.name}</h3>
                        <p>$
                            <span class="price">${fish.basePrice}</span>
                        </p>
                    </div>
                    <div class="caption card-footer">
                        <button class="add btn btn-danger">Add to Basket</button>
                    </div>
                </div>
            </div>
            `
    })
    $('#available').append(domString);
}

// Dynamically listen for events that happen on buttons with a class of add
$('body').on('click', 'button.add', (e) => {
    // what is the div that has the fish
    const fishToMove = $(e.target).closest('.fish');
    // move it to the 'snagged' div
    $("#snagged").append(fishToMove);
    // button text => Remove from Basket | change class - 'add' + 'remove'
    $(e.target).text('Remove from Basket').addClass('remove').removeClass('add');
})

// Dynamically listen for events that happen on buttons with a class of remove
$('body').on('click', 'button.remove', (e) => {
    // what is the div that has the fish to move back
    const fishToMove = $(e.target).closest('.fish');
    // move it to the 'available' div
    $("#available").append(fishToMove);
    // button text => Add to Basket | change class - 'remove' + 'add'
    $(e.target).text('Add To Basket').addClass('add').removeClass('remove');
})

$("#show-sale").click(() => {
    // alert("muh fish");
    // All divs with class "fish"
    // Give just the ones without class "sale"
    // If not on sale, hide fish
    $(".fish").not(".on-sale").toggle();
    $("#show-sale").text((i, text) => {
        if (text === "Show Sale Fish") {
            return "Show All";
        } else {
            return "Show Sale Fish";
        }
    });
});

// Load Fish
$.get('../db/fishes.json')
    .done((data) => {
        console.log(data);
        writeFishes(data.fishes);
        applySale();
    })
    .fail((error) => {
        console.log(error);
    })
$(".add").on('click', () => {
    alert('fish!!!!')
});


