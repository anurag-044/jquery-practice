$(document).ready(function () {
    $(window).on("load", function () {
        drop();
        getDataDrop();
        showTableAdd();
        getdataDropforemail();
    });
    $("#name_l").hide();
    $("#phone_l").hide();
    $("#a").hide();
    var name_ch = true;
    var phone_ch = true;
    var email_ch = true;
    var emailBlankStr = "";
    var emailBlankArray = [];
    var cityobj
    var table;
    $("#name_select").change(function () {
        showTableDetails();
    });
    $("#name").blur(function () {
        $("#name_l").hide();
    });

    $("#phone").blur(function () {
        $("#phone_l").hide();
    });

    $("#name").focus(function () {
        nameCheck();
    });

    $("#name").keyup(function () {
        nameCheck();
    });
    $("#phone").focus(function () {
        phone_check();
    });
    $("#phone").keyup(function () {
        phone_check();
    });

    $(".appendEmail").blur(function () {
        $("#email_l").hide();
    });

    $(".appendEmail").focus(function () {
        emailCheck();
    });
    $(".appendEmail").keyup(function () {
        emailCheck();
    });

    $("#addemail").click(function () {
        var email = $("#email_a").val();
        emailCheck();

        if (email.match(/^ *$/) == null && email_ch == true) {
            $("#a").show();
            $("#a").append(
                '<div class="con"><input type="text" id="email" class="appendEmail" value="" placeholder="Email"  />' +
                '    <img src="minus-solid.svg" class="btnRemove" alt="" width="20px">' +
                '<lable class="email_l"></lable>'
            );
        }
    });
    $("body").on("click", ".btnRemove", function () {
        $(this).parent("div.con").remove();
    });

    function nameCheck() {
        var name = $("#name").val();
        var regex_name = /^[A-Za-z ]{3,500}$/;
        var personDetails = localStorage.getItem("personDetails");
        var personDetailsArray = JSON.parse(personDetails);
        for (var key in personDetailsArray) {
            if (personDetailsArray[key].name == name) {
                $("#name_l").show();
                $("#name_l").html("Please not enter duplicate value");
                $("#name_l").css("color", "red");
                name_ch = false;
                return false;
            }
        }

        if (name == null || name === "") {
            $("#name_l").show();
            $("#name_l").html("Please enter your name");
            $("#name_l").css("color", "red");
            name_ch = false;
            return false;
        } else if (!regex_name.test(name)) {
            $("#name_l").show();
            $("#name_l").html(
                "Name should be more then 3 characters or number/special char not allowed "
            );
            $("#name_l").css("color", "red");
            name_ch = false;
            return false;
        } else {
            $("#name_l").hide();
            name_ch = true;
            return true;
        }
    }
    function emailCheck() {
        $(".appendEmail").each(function () {
            var regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
            if ($(this).val() == null || $(this).val() == "") {
                $("#email_l").show();
                $("#email_l").html("Please enter your email");
                $("#email_l").css("color", "red");
                email_ch = false;
                return false;
            } else if (!regex_email.test($(this).val())) {
                $("#email_l").show();
                $("#email_l").html("Email is invalid");
                $("#email_l").css("color", "red");
                email_ch = false;
                return false;
            } else {
                $("#email_l").hide();
                email_ch = true;
                return true;
            }
        });
    }
    function phone_check() {
        const regex3 = /^\d{10}$/gims;
        var phone = $("#phone").val();

        if (phone.length == null || phone.length == "") {
            $("#phone_l").show();
            $("#phone_l").html("Enter your Phone Number");
            $("#phone_l").css("color", "red");
            phone_ch = false;
            return false;
        } else if (!regex3.test(phone)) {
            $("#phone_l").show();
            $("#phone_l").html("The phone should be 10 numbers");
            $("#phone_l").css("color", "red");
            phone_ch = false;
            return false;
        } else {
            $("#phone_l").show();
            $("#phone_l").html("Valid Phone number");
            $("#phone_l").css("color", "green");
            phone_ch = true;
        }
    }
    function drop() {
 

        $.ajax({
            url: "https://raw.githubusercontent.com/anurag-044/indian-cities/main/newcountry.json",
            dataType: "json",
            type: "GET",
            success: function (data) {
              
              cityobj = data
              var countryName = $("#country");
              var cityName = $("#city");
              var optionsCoun = "";
              var optionsCity;
      
              for (var countryIndex in cityobj) {
                  optionsCoun += "<option>" + countryIndex + "</option>";
              }
              countryName.append(optionsCoun);
      
              $("#country").change(function () {
                  var countryVal = $("#country").val();
      
                  for (var cityIndex in cityobj[countryVal]) {
                      optionsCity +=
                          "<option>" + cityobj[countryVal][cityIndex] + "</option>";
                  }
                  cityName.append(optionsCity);
              });
            }
          });     
    }
    function getDataDrop() {
        var personDetails = localStorage.getItem("personDetails");
        var personDetailsArray = JSON.parse(personDetails);
        var optionDrop;
        var booker = $("#booker");

        for (var Index in personDetailsArray) {
            optionDrop += "<option>" + personDetailsArray[Index].name + "</option>";
        }
        booker.append(optionDrop);
    }
    function showTableAdd() {
        var personAdver = localStorage.getItem("personAdver");
        var personAdverArray = JSON.parse(personAdver);
        var table = "<table id='myTableData' border='1' cellpadding='10'>";
        table += "<tr>";
        table += "<th>Name</th>";
        table += "<th>Date</th>";
        table += "<th>Charge</th>";
        for (let i = 0; i < personAdverArray.length; i++) {
            table += "<tr>";
            for (const key in personAdverArray[i]) {
                table += "<td>" + personAdverArray[i][key] + "</td>";
            }

            table += "</tr>";
        }
        table += "</table>";
        $("#mydata").html(table);
    }

    function getdataDropforemail() {
        var personDetails = localStorage.getItem("personDetails");
        var personDetailsArray = JSON.parse(personDetails);
        var optionDrop;

        var booker = $("#name_select");
        for (var Index in personDetailsArray) {
            optionDrop += "<option>" + personDetailsArray[Index].name + "</option>";
        }
        booker.append(optionDrop);
    }

    function showTableDetails() {
        var personDetails = localStorage.getItem("personDetails");
        var personDetailsArray = JSON.parse(personDetails);

        var name = $("#name_select").val();

        for (let i = 0; i < personDetailsArray.length; i++) {
            if (personDetailsArray[i].name == name) {
                emailBlankStr = personDetailsArray[i].email;
            }
        }
        emailBlankArray = emailBlankStr.split(",");

        table = "<table id='myTableData' border='1' cellpadding='10'>";

        table += "<th>Email";

        for (let i = 0; i < emailBlankArray.length; i++) {
            table += "<tr><td>" + emailBlankArray[i] + "</td>";
            table +=
                "<td>" + '<button class="removeEmail">remove</button> ' + "</td>";
            table += "</tr>";
        }

        table += "</table>";

        $("#mydata2").html(table);
        removeEmail();
    }

    function removeEmail() {
        var remove = $(".removeEmail");
        var emailArray = [];

        for (let i = 0; i < remove.length; i++) {
            $(remove[i]).click(function () {
                if (i > -1) {
                    emailBlankArray.splice(i, 1);
                }

                emailArray = emailBlankArray;

                var personDetails = localStorage.getItem("personDetails");
                var personDetailsArray = JSON.parse(personDetails);
                var name_b = $("#name_select").val();
                var keys;
                let obj;
                for (var key in personDetailsArray) {
                    if (personDetailsArray[key].name == name_b) {
                        var name = personDetailsArray[key].name;
                        var phone = personDetailsArray[key].phone;
                        var country = personDetailsArray[key].country;
                        var city = personDetailsArray[key].city;

                        obj = {
                            name: `${name}`,
                            email: `${emailArray}`,
                            phone: `${phone}`,
                            country: `${country}`,
                            city: `${city}`,
                        };
                        keys = key;
                    }
                }
                personDetailsArray.splice(keys, 1, obj);
                localStorage.setItem(
                    "personDetails",
                    JSON.stringify(personDetailsArray)
                );

                showTableDetails();
            });
        }
    }

    $("#subtn").click(function () {
        nameCheck();
        emailCheck();
        phone_check();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var country = $("#country").val();
        var city = $("#city").val();

        if (name_ch == true && email_ch == true && phone_ch == true && country.match(/^ *$/) == null && city.match(/^ *$/) == null) {
          
            var EmailArray = [];

            $(".appendEmail").each(function () {
                var subject = $(this).val();
                EmailArray.push(subject);
            });

            let obj = {
                name: `${name}`,
                email: `${EmailArray}`,
                phone: `${phone}`,
                country: `${country}`,
                city: `${city}`,
            };

            var personDetails = localStorage.getItem("personDetails");
            var personDetailsArray = JSON.parse(personDetails);
            var personDetailsBlankArray = [];

            if (personDetails == null) {
                personDetailsBlankArray.push(obj);
                localStorage.setItem(
                    "personDetails",
                    JSON.stringify(personDetailsBlankArray)
                );
            } else {
                personDetailsArray.push(obj);
                localStorage.setItem(
                    "personDetails",
                    JSON.stringify(personDetailsArray)
                );
            }
        } else {
           $("#fill").html("Please fill the form");
            return false;
        }
    });

    $("#addAdver").click(function () {
        var name = $("#booker").val();
        var date = $("#date").val();
        var numOfAdd = $("#adv").val();
        var charge;

        if (
            name.match(/^ *$/) !== null ||
            date.match(/^ *$/) !== null ||
            numOfAdd.match(/^ *$/)
        ) {
            alert("Please select all the coloum");
            return;
        }
        if (numOfAdd <= 3) {
            charge = numOfAdd * 300;
        }
        if (numOfAdd > 3) {
            let val = numOfAdd - 3;
            let discount = 90 * val;
            charge = numOfAdd * 300 - discount;
        }

        let obj = {
            name: `${name}`,
            date: `${date}`,
            charge: `${charge}`,
        };

        var personAdver = localStorage.getItem("personAdver");
        var personAdverArray = JSON.parse(personAdver);
        var personAdverArray2 = JSON.parse(personAdver);
        var personAdverBlankArray = [];

        if (personAdver == null) {
            personAdverBlankArray.push(obj);
            localStorage.setItem(
                "personAdver",
                JSON.stringify(personAdverBlankArray)
            );
        } else {
            personAdverArray.push(obj);
            localStorage.setItem("personAdver", JSON.stringify(personAdverArray));
        }

        for (var key in personAdverArray2) {
            if (personAdverArray2[key].name == name) {
                if (numOfAdd <= 3) {
                    charge = numOfAdd * 300;
                }
                if (numOfAdd > 3) {
                    let val = numOfAdd - 3;
                    let discount = 90 * val;
                    charge = numOfAdd * 300 - discount;
                }

                var charge2 = parseInt(personAdverArray2[key].charge) + charge;

                let obj = {
                    name: `${name}`,
                    date: `${date}`,
                    charge: `${charge2}`,
                };
                personAdverArray2.splice(key, 1, obj);
                localStorage.setItem("personAdver", JSON.stringify(personAdverArray2));
            }
        }
    });
});
