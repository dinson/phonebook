$(document).ready(() => {
    console.log("Init add-contact.js")

    $('#btn-add-number').on("click", () => {
        console.log("Add another number")

        $('<input />', {
            "class": "form-control mt-2",
            "name": "contactNumber",
            "type": "number",
            "placeholder": "new number",
            "required": true
        }).appendTo('#numbersList')

    })
})
