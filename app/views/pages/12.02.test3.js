$(function() {

    var datePickerSettings = {
        closeText: "Готово",
        prevText: "Назад",
        nextText: "Вперед",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Нов", "Дек"],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед.",
        dateFormat: "dd.mm.yy",
        firstDay: 1
    };
    $( ".form__input--date" ).datepicker(datePickerSettings);

    var addButton = $('.add-fields-anketa-button'),
    deleteButton = $('.delete-fields-anketa-button');
    deleteButton.hide();
    addButton.click(
    function() {
        var $this = $(this),
        container = $('#' + $this.data('type')),
        counter = (typeof $this.data('el-counter') != 'undefined' ? $this.data('el-counter') : 0),
        elements = $('.' + $this.data('type') + '-fields:last').clone(), attr;
        var delButton = $('.delete-fields-anketa-button[data-type="' + $this.data('type') + '"]');

        if (counter == $this.data('limit') - 2) {
            delButton.css({
                float: 'left'
            });
            $this.hide();
        }

        counter++;

        var caption = $('h3:first', elements).text();
        $('h3:first', elements).text(caption.replace(/[0-9].*/, (counter + 1)));

        var replaceRegx = new RegExp('[0-9]*(?=\])');
        $('input, select, label', elements).each(
        function(i, val) {
            $(val).val('');
            $(val).removeClass('errorValidation');
            attr = $(val).attr('for');
            if (typeof attr != 'undefined') {
                //for labels
                attr = attr.replace(replaceRegx, counter);
                $(val).attr('for', attr)
            } else {

                $(val).attr('id', $(val).attr('id').replace(replaceRegx, counter));
                $(val).attr('name', $(val).attr('name').replace(replaceRegx, counter));
            }
        });

        elements.find('.subdivision__code').removeClass('required')
        .next().hide();

        if (delButton.is(':hidden')) {
            delButton.show();
        }
        container.append(elements);
        elements.find('.hasDatepicker').removeClass('hasDatepicker').datepicker(datePickerSettings);
        $this.data('el-counter', counter);
        $('.jurisdiction').on('change', jurisdictionHandler);
        scrollToElement(elements);
    });

    deleteButton.click(
    function() {
        var $this = $(this),
        type = $this.data('type'),
        selector = '.' + type + '-fields',
        button = $('.add-fields-anketa-button[data-type="' + type + '"]');

        if ($(selector).length > 1) {
            $(selector + ':last').remove();
            button.data('el-counter', (button.data('el-counter') - 1));
        }

        if (button.is(':hidden')) {
            $this.css({
                float: 'right'
            });
            button.show();
        }

        if ($(selector).length == 1) {
            $this.hide();
        }

        scrollToElement(selector + ':last');
    });

    $('.jurisdiction').on('change', jurisdictionHandler);
});

var JURISDICTION_COUNTRY_RUSSIA = 643;

function jurisdictionHandler() {
    var self = $(this);
    var code = $(this).closest('.beneficially-fields').find('.subdivision__code');

    if (!code.length) 
        return;

    code.each(function(i, input) {
        var $input = $(input);
        if (self.val() == JURISDICTION_COUNTRY_RUSSIA) {
            $input.addClass('required');
            $input.next().show();
        } else {
            $input.removeClass('required');
            $input.next().hide();
        }
    });
}

function scrollToElement(a) {
    var top;
    if (typeof a == 'string') {
        top = $(a).position().top;
    } else if (typeof a == 'object') {
        top = a.position().top;
    }

    $('html, body').animate({
        'scrollTop' : top
    });
}

// ОБЩИЕ
function best(obj, obj1)
{
    if (document.getElementById(obj).style.display == "block") 
        document.getElementById(obj).style.display = "none";
    else 
        document.getElementById(obj).style.display = "block";
    if (document.getElementById(obj1).style.display == "block") 
        document.getElementById(obj1).style.display = "none";
    else 
        document.getElementById(obj1).style.display = "block";
}
// СТРАНИЦА №1
function newurisDate(_dateString)
{
    var day = _dateString.substring(0, 2);
    var month = _dateString.substring(3, 5);
    var year = _dateString.substring(6, 10);
    var r1 = _dateString.substring(2, 3);
    var r2 = _dateString.substring(5, 6);
    if ((r1 != ".") || (r2 != ".")) {
        return true;
    }
    month = month-1;
    var test3 = new Date(year, month, day);
    if ((year == test3.getFullYear()) && (month == test3.getMonth()) && (day == test3.getDate()))
    {
        return false;
    } else
    {
        //alert(test3.getYear()+"-"+test3.getMonth()+"-"+test3.getDate());
        return true;
    }
}
function checkFields() 
{
    var p1 = document.getElementById("urp11");
    var p2 = document.getElementById("urp13");
    var p3 = document.getElementById("urp14");
    var p4 = document.getElementById("urp15");
    var f1 = document.getElementById("fiz_fact2");
    var f2 = document.getElementById("fiz_fact4");
    var f3 = document.getElementById("fiz_fact5");
    var f4 = document.getElementById("fiz_fact6");

    if (p1.value.length == 0) {
        alert("Введите, пожалуйста, индекс (Индекс должен содержать 6 цифр)");
        p1.focus();
        return false;
    }
    if (p2.value.length == 0) {
        alert("Введите, пожалуйста, город");
        p2.focus();
        return false;
    }
    if (p3.value.length == 0) {
        alert("Введите, пожалуйста, адрес");
        p3.focus();
        return false;
    }
    if (p4.value.length == 0) {
        alert("Введите, пожалуйста, номер дома");
        p4.focus();
        return false;
    }
    if (f1.value.length == 0) {
        alert("Введите, пожалуйста, индекс (Индекс должен содержать 6 цифр)");
        f1.focus();
        return false;
    }
    if (f2.value.length == 0) {
        alert("Введите, пожалуйста, город");
        f2.focus();
        return false;
    }
    if (f3.value.length == 0) {
        alert("Введите, пожалуйста, адрес");
        f3.focus();
        return false;
    }
    if (f4.value.length == 0) {
        alert("Введите, пожалуйста, номер дома");
        f4.focus();
        return false;
    }


    var founders = $('#founder input');
    var shareSum = 0, checkFlag = true;
    founders.each(function(i, val) {
        var $input = $(val), share;
        if (typeof $input.data('share') != 'undefined') {
            share = parseInt($input.val());
            if (!isNaN(share)) {
                shareSum += share;
            }
        } else if ($input.next().hasClass('star') && !$input.val().length) {
            alert('Поле обязательно для заполнения');
            $input.focus();
            scrollToElement($input);
            checkFlag = false;
            return false;
        }
    });

    var benef = $('#beneficially input.required, #beneficially select.required');

    benef.each(function(i, val) {
        if (!$(val).val().length) {
            checkFlag = false;
            alert('Поле обязательно для заполнения');
            $(val).focus();
            scrollToElement($(val));
            return false;
        }
    });

    if (shareSum > 100) {
        alert('Суммарная доля учредителей, должна быть не больше 100%');
        checkFlag = false;
    }

    return checkFlag;
    /*var f1 = document.getElementById("founder03");
             var f2 = document.getElementById("founder13");
             var f3 = document.getElementById("founder23");
             var f4 = document.getElementById("founder33");
             var f5 = document.getElementById("founder43");
             if((check(f1))&&(check(f2))&&(check(f3))&&(check(f4))&&(check(f5))) {
                convertToFloat();
                return true;
             }
             else {
                return false;
             }*/
}
function check(f1) // СТРАНИЦА №1,2
{
    for (var i = 0; i < f1.value.length; i++) {
        var chr = f1.value.charAt(i);
        if (chr != 0
        && chr != 1
        && chr != 2
        && chr != 3
        && chr != 4
        && chr != 5
        && chr != 6
        && chr != 7
        && chr != 8
        && chr != 9
        && chr != "."
        && chr != ','
        )
        {
            alert("Введите, пожалуйста, число");
            f1.focus();
            return false;
        }
    }
    return true;
}
function convertToFloat()
{
    var f1 = document.getElementById("founder03");
    var f2 = document.getElementById("founder13");
    var f3 = document.getElementById("founder23");
    var f4 = document.getElementById("founder33");
    var f5 = document.getElementById("founder43");
    if (f1.value != "")
    {
        document.forms["anketaur"].elements["founder03"].value = parseFloat(f1.value.replace(',', '.').replace(' ', '.'));
    }
    if (f2.value != "")
    {
        document.forms["anketaur"].elements["founder13"].value = parseFloat(f2.value.replace(',', '.').replace(' ', '.'));
    }
    if (f3.value != "")
    {
        document.forms["anketaur"].elements["founder23"].value = parseFloat(f3.value.replace(',', '.').replace(' ', '.'));
    }
    if (f4.value != "")
    {
        document.forms["anketaur"].elements["founder33"].value = parseFloat(f4.value.replace(',', '.').replace(' ', '.'));
    }
    if (f5.value != "")
    {
        document.forms["anketaur"].elements["founder43"].value = parseFloat(f5.value.replace(',', '.').replace(' ', '.'));
    }
}
function newurRegPostChange()
{
    if (document.anketaur.elements["RegPost"].value == "77") 
    {
        document.anketaur.elements["urp13"].value = "Москва"
    } else 
    {
        document.anketaur.elements["urp13"].value = ""
    }
    return true;
}
function newurnewadresfact()
{
    document.getElementById("fiz_fact1").value = document.getElementById("urp10").value;
    document.getElementById("fiz_fact2").value = document.getElementById("urp11").value;
    document.getElementById("fiz_fact4").value = document.getElementById("urp13").value;
    document.getElementById("fiz_fact5").value = document.getElementById("urp14").value;
    document.getElementById("fiz_fact6").value = document.getElementById("urp15").value;
    document.getElementById("fiz_fact7").value = document.getElementById("urp16").value;
    document.getElementById("fiz_fact8").value = document.getElementById("urp17").value;
}
function newurnewadressp()
{
    document.getElementById("urp10").value = document.getElementById("ur10").value;
    document.getElementById("urp11").value = document.getElementById("ur11").value;
    document.getElementById("urp13").value = document.getElementById("ur13").value;
    document.getElementById("urp14").value = document.getElementById("ur14").value;
    document.getElementById("urp15").value = document.getElementById("ur15").value;
    document.getElementById("urp16").value = document.getElementById("ur16").value;
    document.getElementById("urp17").value = document.getElementById("ur17").value;
}
function newururisdic()
{
    if (document.anketaur.ur3[0].checked) {
        // юрисдикция да
        document.anketaur.elements["ur4"].disabled = true;
        document.anketaur.elements["ur4"].style.backgroundColor = "#E9F5EC";
    } else {
        // юрисдикция иное
        document.anketaur.elements["ur4"].style.backgroundColor = "rgb(255,255,255)"
        document.anketaur.elements["ur4"].disabled = false;
    }
}
function newurRegChange()
{
    if (document.anketaur.elements["Reg"].value == "77") {
        document.anketaur.elements["ur13"].value = "Москва"
    } else 
    {
        document.anketaur.elements["ur13"].value = ""
    }
    return true;
}
function newurRegFactChange()
{
    if (document.anketaur.elements["RegFact"].value == "77") {
        document.anketaur.elements["fiz_fact4"].value = "Москва"
    } else 
    {
        document.anketaur.elements["fiz_fact4"].value = "";
    }
    return true;
}
function newururn3()
{
    if (document.anketaur.urn3[0].checked) {
        document.anketaur.elements["urcom1"].disabled = false;
        document.anketaur.elements["urcom2"].disabled = true;
    } else {
        document.anketaur.elements["urcom1"].disabled = true;
        document.anketaur.elements["urcom2"].disabled = false;
    }
}
function checkdataff(letterData)
{
    //*****************************************************************************************************      
    var letter = document.getElementById(letterData).value; //Данные которые ввел пользователь в форму ввода
    if (letter == "") //Проверка на пустую строку
    {
        alert("Введите, пожалуйста, дату");
        document.getElementById(letterData).focus(); //Возвращение фокуса в поле ввода в FireFox
        return false; //прекращает выполнение дальнейшей программы
    }
    if ((letter.match(/^[0-9]{0,1}[0-9]{0,1}\.[0-9]{0,1}[0-9]{0,1}\.[0-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$/)) == null) //Ставим ограничения на вводимые символы в поле ввода (только цифры)
    {
        alert("Введенные данные не соответствуют формату даты или введены недопустимые символы.");
        document.getElementById(letterData).focus(); //Возвращение фокуса в поле ввода в FireFox
        return false; //прекращает выполнение дальнейшей программы
    }
    //**********************Текущая дата DataTemp***************************
    var temp_date = new Date(); //Создание текущей даты
    var day = temp_date.getDate(); // Получение числа из текущей даты формата GMT
    var month = temp_date.getMonth() + 1; //Получение месяца из текущей даты формата GMT; +1 добавляется для того, чтобы перевести месяц в привычный нам формат, т.к они нумеруются с "0"!
    var year = temp_date.getFullYear(); // Получение года из текущей даты формата GMT
    var sec = new String(); //Преобразование даты в строку в формате GMT
    sec = temp_date.toGMTString()
    var msec = Date.parse(sec) //Дата в милисекундах начиная с 1 января 1970 года

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    //***конец текущей даты

    var arr = letter.split("."); //Формируем массив из введенного пользователем выражения и разделяем его по "."
    //****************Дата, сформированная из введного пользователем date DataOut****************************
    var day_out = arr[0]; //Значение числа из введенного окна, уже разделенное оператором split
    var month_out = (arr[1]-1); //Значение месяца из введенного окна, уже разделенное оператором split
    var year_out = arr[2]; //Значение года из введенного окна, уже разделенное оператором split
    var data_out = new Date(); //Создание даты выдачи паспорта из строки введенной клиентом
    data_out.setDate(day_out); //Эта и следующая строка формируют из числа вводимого пользователем дату (в данном случае день)
    var day_out1 = data_out.getDate();
    data_out.setMonth(month_out); //Формируется месяц
    var month_out1 = data_out.getMonth();
    data_out.setYear(year_out); //Формируется год
    var year_out1 = data_out.getFullYear();
    var sec_out = new String(); //Преобразование даты в строку из секунд в формате GMT
    sec_out = data_out.toGMTString()
    var msec_out = Date.parse(sec_out) //Отражение даты в милисекундах относительно 1 января 1970 года
    if (day_out1 < 10) {
        day_out1 = "0" + day_out1;
    }
    if (month_out1 < 10) {
        month_out1 = "0" + month_out1;
    }
    //***конец DataOut
    if (((arr[0] == 0) || (arr[0] == "00")) && ((arr[1] == 0) || (arr[1] == "00")) && ((arr[2] == 0) || (arr[2] == "00") || (arr[2] == "000") || (arr[2] == "0000"))) //Проверка на невозможность введния нулей
    {
        alert ("Введите, пожалуйста, дату правильно!");
        document.getElementById(letterData).focus();
        return false;
    }
    if (arr[0] > 31) //Проверка на невозможность введения числа больше 31Ы
    {
        alert("Число не может быть больше 31!");
        document.getElementById(letterData).focus();
        return false;
    }
    if ((arr[0] == 0) || (arr[0] == "00"))
    {
        alert ("Вы неправильно ввели число!");
        document.getElementById(letterData).focus();
        return false;
    }
    if (arr[1] > 12) //Проверка на невозможность введения месяца больше 12
    {
        alert("Номер месяца не может превышать 12!");
        document.getElementById(letterData).focus();
        return false;
    }
    if ((arr[1] == 0) || (arr[1] == "00"))
    {
        alert ("Вы неправильно ввели месяц!");
        document.getElementById(letterData).focus();
        return false;
    }
    if ((arr[2]%4 == 0) && (arr[1] == 2) && (arr[0] > 29))
    {
        alert("В високосном году в феврале только 29 дней!");
        document.getElementById(letterData).focus();
        return false;
    }
    if ((arr[2]%4 !== 0) && (arr[1] == 2) && (arr[0] > 28))
    {
        alert("В феврале только 28 дней!");
        document.getElementById(letterData).focus();
        return false;
    }
    var flag = false;
    var arr31 = new Array(1, 3, 5, 7, 8, 10, 12)
    if (arr[1] == arr31[0]) 
        flag = true;
    if (arr[1] == arr31[1]) 
        flag = true;
    if (arr[1] == arr31[2]) 
        flag = true;
    if (arr[1] == arr31[3]) 
        flag = true;
    if (arr[1] == arr31[4]) 
        flag = true;
    if (arr[1] == arr31[5]) 
        flag = true;
    if (arr[1] == arr31[6]) 
        flag = true;
    if (arr[1] == 2) 
        flag = true;
    if ((flag == false) && (arr[0] > 30)) 
    {
        alert("В этом месяце 30 дней");
        document.getElementById(letterData).focus();
        return false;
    }
    if (arr[2] < 1900)
    {
        alert("Обратите внимание на год! Он меньше 1900 года");
        document.getElementById(letterData).focus();
        return false;
    }
    if (letterData == 'letterData1')
    {
        if (msec_out > msec) 
        {
            alert("Указанная Вами дата еще не наступила!");
            document.getElementById(letterData).focus();
            return false;
        }
    }
    //****************************************************************************************************************
    return true;
}
function str2dt2 (str_date)
{

    var arrD = new Array();
    var m, d, Y;
    arrD = str_date.split(".");
    d = parseInt(correct_number(arrD[0]));
    m = parseInt(correct_number(arrD[1])) - 1;
    Y = parseInt(arrD[2]);
    return (new Date(Y, m, d));

}
function correct_number(strIn) 
{
    var res;
    if (strIn.length == 2 && (strIn.substr(0, 1) == '0')) {
        res = strIn.substr(1, 1);
    } else {
        res = strIn;
    }
    return (res);
}
function check_phone(f1) 
{
    for (var i = 0; i < f1.value.length; i++) 
    {
        var chr = f1.value.charAt(i);

        if (chr != 0 && chr != 1 && chr != 2 && chr != 3 && chr != 4 && chr != 5 && chr != 6 && chr != 7 && chr != 8 && chr != 9 && chr != '-' && chr != '(' && chr != ')' && chr != '+')
        {
            alert("Введите, пожалуйста, корректный телефон");
            f1.focus();
            return false;
        }
    }
    return true;
}
function newurfields04(obj, obj1) 
{
    if (document.anketaur.ur1.value.length < 1)
    {
        alert ("Введите, пожалуйста, полное наименование организации");
        document.anketaur.ur1.focus();
        return false;
    }
    if (document.anketaur.client_name_eng.value.length < 1)
    {
        alert ("Введите, пожалуйста, полное наименование организации на иностранном языке");
        document.anketaur.client_name_eng.focus();
        return false;
    }
    if (document.anketaur.regplace.value.length < 1)
    {
        alert ("Введите, пожалуйста, место гос. регистрации");
        document.anketaur.regplace.focus();
        return false;
    }
    if (document.anketaur.contact1.value.length < 1)
    {
        alert ("Введите, пожалуйста, ФИО");
        document.anketaur.contact1.focus();
        return false;
    }
    if (document.anketaur.contact2.value.length < 1)
    {
        alert ("Введите, пожалуйста, должность");
        document.anketaur.contact2.focus();
        return false;
    }
    var e1 = document.anketaur.contact3;
    var e2 = document.anketaur.contact4;
    if (e1.value.length == 0) {
        alert("Введите, пожалуйста, телефон");
        e1.focus();
        return false;
    }
    if (e1.value.length != 0) {
        if (!check_phone(e1)) 
            return false;
    }
    if (e2.value.length == 0) {
        alert("Введите, пожалуйста, e-mail");
        e2.focus();
        return false;
    }
    if (e2.value.length != 0 && e2.value.indexOf('@') == -1) {
        alert("Введите, пожалуйста, корректный e-mail (должен содержать символ @)");
        e2.focus();
        return false;
    }
    if (newurStringTwoChar(e2.value, "@", ".")) {
        alert ("Ошибка в формате адреса электронной почты, проверьте введенный адрес!");
        e2.focus();
        return false;
    }

    if ((document.anketaur.ur6.value.length < 1))
    {
        alert ("Введите, пожалуйста, Должность уполномоченного");
        document.anketaur.ur6.focus();
        return false;
    }
    if ((document.anketaur.ur5.value.length < 1))
    {
        alert ("Введите, пожалуйста, ФИО уполномоченного");
        document.anketaur.ur5.focus();
        return false;
    }


    if ((document.anketaur.ur7.value.length < 1))
    {
        alert ("Введите, пожалуйста, основание на котором действует уполномоченный");
        document.anketaur.ur7.focus();
        return false;
    }
    if (document.anketaur.ur7.value != 'Устав' && document.anketaur.fiz_dover_upoln.value.length < 1)
    {
        alert ("Введите, пожалуйста, № доверенности");
        document.anketaur.fiz_dover_upoln.focus();
        return false;
    }

    if (document.anketaur.ur7.value == 'Устав')
    {
        document.anketaur.fiz_dover_upoln.value = '';
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // проверяем дату выдачи доверенности уполномоченного представителя
    if (!checkdataff("letterData1")) 
        return false;
    if (!checkdataff("letterData2")) 
        return false;
    var dat_f = str2dt2(document.getElementById("letterData1").value);
    var dat_t = str2dt2(document.getElementById("letterData2").value);
    if (dat_f > dat_t) 
    {
        alert ("Время окончания периода меньше времени начала");
        document.getElementById("letterData2").focus();
        return false;
    }
    var flg_upoln2 = false;

    if (document.anketaur.ur9.value.length > 0) {
        flg_upoln2 = true;
    };
    if (document.anketaur.ur8.value.length > 0) {
        flg_upoln2 = true;
    };
    if (document.anketaur.ur91.value.length > 0) {
        flg_upoln2 = true;
    };
    if (document.anketaur.ur92.value.length > 0) {
        flg_upoln2 = true;
    };
    if (flg_upoln2)
    {
        if ((document.anketaur.ur9.value.length < 1))
        {
            alert ("Введите, пожалуйста, Должность уполномоченного");
            document.anketaur.ur9.focus();
            return false;
        }
        if ((document.anketaur.ur8.value.length < 1))
        {
            alert ("Введите, пожалуйста, ФИО уполномоченного");
            document.anketaur.ur8.focus();
            return false;
        }
        if ((document.anketaur.ur91.value.length < 1))
        {
            alert ("Введите, пожалуйста, основание на котором действует уполномоченный");
            document.anketaur.ur91.focus();
            return false;
        }
        if ((document.anketaur.ur92.value.length != 10))
        {
            alert ("Введите, пожалуйста, дату начала полномочий в указанном формате");
            document.anketaur.ur92.focus();
            return false;
        }
        if (newurisDate(document.anketaur.ur92.value))
        {
            alert ("Не верно указан формат даты выдачи полномочий");
            document.anketaur.ur92.focus();
            return false;
        }
    }
    /*if (document.anketaur.founder01.value.length<1)
                {
                     alert ("Введите, пожалуйста, ФИО");
                     document.anketaur.founder01.focus();
                     return false;
                }
              if (document.anketaur.founder03.value.length<1)
                {
                     alert ("Введите, пожалуйста, размер доли");
                     document.anketaur.founder03.focus();
                     return false;
                }
            if (isNaN(document.anketaur.founder03.value))
        {
            alert ("Неправильно введен размер доли (только цифры)");
            document.anketaur.founder03.focus();
            return false;
        }        
         if (document.anketaur.founder03.value-100>0)
                {
                     alert ("Размер доли больше 100%");
                     document.anketaur.founder03.focus();
                     return false;
                }*/
    // Адресная информация
    if (document.anketaur.ur10.value.length < 1)
    {
        alert ("Введите, пожалуйста, страну адреса регистрации");
        document.anketaur.ur10.focus();
        return false;
    }
    if ((document.anketaur.ur11.value.length < 1))
    {
        alert ("Введите, пожалуйста, индекс");
        document.anketaur.ur11.focus();
        return false;
    }
    if (document.anketaur.ur13.value.length < 1)
    {
        alert ("Введите, пожалуйста, город или населенный пункт адреса регистрации");
        document.anketaur.ur13.focus();
        return false;
    }
    if (document.anketaur.ur14.value.length < 1)
    {
        alert ("Необходимо заполнить адрес");
        document.anketaur.ur14.focus();
        return false;
    }
    if (document.anketaur.ur15.value.length < 1)
    {
        alert ("Введите, пожалуйста, номер дома");
        document.anketaur.ur15.focus();
        return false;
    }
    if ((document.anketaur.urp11.value.length < 1))
    {
        alert ("Введите, пожалуйста, индекс");
        document.anketaur.urp11.focus();
        return false;
    }
    if ((document.anketaur.fiz_fact2.value.length < 1))
    {
        alert ("Введите, пожалуйста, индекс");
        document.anketaur.fiz_fact2.focus();
        return false;
    }
    if (checkFields())
    {
        if (document.getElementById(obj).style.display == "block") 
            document.getElementById(obj).style.display = "none";
        else 
            document.getElementById(obj).style.display = "block";
        if (document.getElementById(obj1).style.display == "block") 
            document.getElementById(obj1).style.display = "none";
        else 
            document.getElementById(obj1).style.display = "block";
        return true;
    } else 
        return false;
}
function newurCheckINN10(INN)
{
    var f1;
    var k;
    var l;
    var res;
    var dv;
    var c10;

    c10 = INN.substring(9, 10);
    res = 0;
    f1 = true;
    dv = 0;
    for (var i = 0; i < 9; i++) {
        k = INN.substring(i, i + 1);
        switch (i + 1) {
        case 1:
            k = k * 2;
            break;
        case 2:
            k = k * 4;
            break;
        case 3:
            k = k * 10;
            break;
        case 4:
            k = k * 3;
            break;
        case 5:
            k = k * 5;
            break;
        case 6:
            k = k * 9;
            break;
        case 7:
            k = k * 4;
            break;
        case 8:
            k = k * 6;
            break;
        case 9:
            k = k * 8;
            break;
        }
        res = res + k;
    }
    dv = 0;
    l = 0;
    dv = Math.floor(res / 11);
    dv = dv * 11;
    dv = res - dv;
    if (dv == 10) {
        dv = 0;
    };
    if (dv == c10) {
        f1 = false
    };
    return f1
}
// СТРАНИЦА №2
function newurfields05(obj, obj1)
{
    if ((document.anketaur.ur18.value.length > 0) && (document.anketaur.ur18.value.length != 20)) {
        alert ("Неправильно введен расчетный счет (он должен содержать 20 знаков)");
        document.anketaur.ur18.focus();
        return false;
    }
    if ((document.anketaur.ur20.value.length > 0) && (document.anketaur.ur20.value.length != 20)) {
        alert ("Неправильно введен кор. счет (он должен содержать 20 знаков)");
        document.anketaur.ur20.focus();
        return false;
    }
    //Проверяем ИНН на 10 цифр
    if ((document.anketaur.ur21.value.length > 0) && (document.anketaur.ur21.value.length != 10) && (isNaN(document.anketaur.ur21.value))) {
        alert ("Неправильно введен ИНН банка (он должен содержать 10 цифр)");
        document.anketaur.ur21.focus();
        return false;
    }
    //Проверяем ИНН на существование
    if ((document.anketaur.ur21.value.length > 0) && (newurCheckINN10(document.anketaur.ur21.value))) {
        alert ("Такой ИНН банка существовать не может, праверьте правильность введенных цифр");
        document.anketaur.ur21.focus();
        return false;
    }
    if ((document.anketaur.ur22.value.length > 0) && (document.anketaur.ur22.value.length != 9)) {
        alert ("Неправильно введен БИК (он должен содержать 9 знаков)");
        document.anketaur.ur22.focus();
        return false;
    }

    // Сведения о государственной регистрации нерезидента РФ
    if (document.anketaur.Doc_Reg_Doc_F.value.length < 1) {
        alert ("Введите, пожалуйста, наименование регистрационного документа");
        document.anketaur.Doc_Reg_Doc_F.focus();
        return false;
    }
    if (document.anketaur.Doc_Reg_N_F.value.length < 1) {
        alert ("Введите, пожалуйста, регистрационный номер");
        document.anketaur.Doc_Reg_N_F.focus();
        return false;
    }
    if (document.anketaur.Doc_reg_F.value.length < 1) {
        alert ("Введите, пожалуйста, наименование регистрирующего органа");
        document.anketaur.Doc_reg_F.focus();
        return false;
    }
    if (!checkdataff("Doc_Reg_Date_F")) 
        return false;

    // Сведения об органах управления из Устава
    if (document.anketaur.govern01.value.length < 1) {
        alert ("Введите, пожалуйста, наименование органа управления");
        document.anketaur.govern01.focus();
        return false;
    }
    if (document.anketaur.govern02.value.length < 1) {
        alert ("Введите, пожалуйста, персональный состав органа управления");
        document.anketaur.govern02.focus();
        return false;
    }
    if (document.anketaur.govern03.value.length < 1) {
        alert ("Введите, пожалуйста, полномочия органа управления");
        document.anketaur.govern03.focus();
        return false;
    }

    // Сведения об аффилированных лицах
    if (document.anketaur.affil01.value.length < 1) {
        alert ("Введите, пожалуйста, сведения об аффилированных лицах (лицо №1)");
        document.anketaur.affil01.focus();
        return false;
    }

    // ++++++Проверка даты Свидетельство о регистрации, выданное до 01.07.2002++++++
    if ((document.anketaur.fiz_kon11.value.length < 1) || (document.anketaur.fiz_kon1.value.length < 1)) {
        alert ("Введите, пожалуйста, контактный телефон с кодом города");
        document.anketaur.fiz_kon11.focus();
        return false;
    }
    if (document.anketaur.fiz_kon2.value.length < 1) {
        alert ("Введите, пожалуйста, Ваш адрес электронной почты");
        document.anketaur.fiz_kon2.focus();
        return false;
    }
    if (newurStringTwoChar(document.anketaur.fiz_kon2.value, "@", ".")) {
        alert ("Ошибка в формате адреса электронной почты, проверьте введенный адрес!");
        document.anketaur.fiz_kon2.focus();
        return false;
    }
    if ((document.anketaur.fiz_kon3.value.length > 0))
    {
        if ((document.anketaur.fiz_kon31.value.length < 1))
        {
            alert ("Вы начали вводить номер факса, введите, пожалуйста, ког города. ");
            document.anketaur.fiz_kon31.focus();
            return false;
        }
    }
    if ((document.anketaur.password.value.length < 1)) {
        alert ("Введите, пожалуйста, пароль для идентификации устных сообщений");
        document.anketaur.password.focus();
        return false;
    }
    if ((document.anketaur.password.value.length < 5) || (document.anketaur.password.value.length > 10)) {
        alert ("Проверьте, пожалуйста, пароль для идентификации устных сообщений, он должен содержать от 5 до 10 символов");
        document.anketaur.password.focus();
        return false;
    }



    if (checkFields_jur())
    {
        if (document.getElementById(obj).style.display == "block") 
            document.getElementById(obj).style.display = "none";
        else 
            document.getElementById(obj).style.display = "block";
        if (document.getElementById(obj1).style.display == "block") 
            document.getElementById(obj1).style.display = "none";
        else 
            document.getElementById(obj1).style.display = "block";
        return true;
    } else 
        return false;
}
function newurDateCheck04(fdt, tdt)
{
    var D = fdt.substring(0, 2);
    var M = fdt.substring(3, 5);
    var Y = fdt.substring(6, 11);
    var D1 = tdt.substring(0, 2);
    var M1 = tdt.substring(3, 5);
    var Y1 = tdt.substring(6, 11);
    var dt = new Date();
    var fdt1 = new Date(Y, M-1, D);
    var tdt1 = new Date(Y1, M1-1, D1);
    if (tdt1 < fdt1) {
        return true
    };
    return false;
}
function validateDate()
{
    var fld = document.getElementById("Doc_Reg_Date_F");

    // for mm/dd/yyyy format:
    var RegExPattern = /^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;

    // for dd/mm/yyyy format:
    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
    var errorMessage = 'Введите правильную дату дд.мм.гггг';
    if (fld.value.length != 0 && !fld.value.match(RegExPattern)) {
        alert(errorMessage);
        fld.focus();
        return false;
    } else 
        return true;
}
function bus_other(a)
{
    var w13 = document.getElementById("work_type13");
    var abiz = document.getElementById("abiz");
    if (w13.checked)
    {
        abiz.disabled = false;
    } else
    {
        abiz.disabled = true;
    }
}
function checkFields_jur()
{
    var e1 = document.getElementById("fiz_kon11");
    var e2 = document.getElementById("fiz_kon1");

    if (e1.value.length == 0) {
        alert("Введите, пожалуйста, код страны и города");
        e1.focus();
        return false;
    }
    if (e1.value.length != 0) {
        for (var i = 0; i < e1.value.length; i++) {
            var chr = e1.value.charAt(i);
            if (chr != 0 && chr != 1 && chr != 2 && chr != 3 && chr != 4 && chr != 5 && chr != 6 && chr != 7 && chr != 8 && chr != 9 && chr != '-' && chr != '(' && chr != ')' && chr != '+') {
                alert("Введите, пожалуйста, корректный код страны и города");
                e1.focus();
                return false;
            }
        }
    }
    if (e2.value.length == 0) {
        alert("Введите, пожалуйста, телефон");
        e2.focus();
        return false;
    }
    if (e2.value.length != 0) {
        for (var i = 0; i < e2.value.length; i++) {
            var chr = e2.value.charAt(i);
            if (chr != 0 && chr != 1 && chr != 2 && chr != 3 && chr != 4 && chr != 5 && chr != 6 && chr != 7 && chr != 8 && chr != 9 && chr != '-' && chr != '(' && chr != ')' && chr != '+') {
                alert("Введите, пожалуйста, корректный телефон");
                e2.focus();
                return false;
            }
        }
    }
    var e1 = document.getElementById("fiz_kon2");
    if (e1.value.length == 0)
    {
        alert("Введите, пожалуйста, адрес электронной почты");
        e1.focus();
        return false;
    }
    if (e1.value.length != 0 && e1.value.indexOf('@') == -1)
    {
        alert("Введите, пожалуйста, корректный e-mail (должен содержать символ @)");
        e1.focus();
        return false;
    }
    var e1 = document.getElementById("password");
    if (e1.value.length == 0)
    {
        alert("Введите, пожалуйста, кодовое слово");
        e1.focus();
        return false;
    }
    if (e1.value.length < 5)
    {
        alert("Кодовое слово должно быть от 5 до 10 символов");
        e1.focus();
        return false;
    }
    var f1 = document.getElementById("kap01");
    var f2 = document.getElementById("kap11");

    if ((validateDate()) && (check(f1)) && (check(f2))) 
    {
        if (f1.value != "")
        {
            document.forms["anketaur"].elements["kap01"].value = parseFloat(f1.value.replace(',', '.').replace(' ', '.'));
        }
        if (f2.value != "")
        {
            document.forms["anketaur"].elements["kap11"].value = parseFloat(f2.value.replace(',', '.').replace(' ', '.'));
        }
        return true;
    } else 
        return false;
}
function newurStringTwoChar(str, ch1, ch2)
{
    var f1 = true;
    var f2 = true;
    for (var i = 0; i <= str.length-1; i++) {
        if (str.substring(i, i + 1) == ch1) {
            f1 = false
        };
        if (str.substring(i, i + 1) == ch2) {
            f2 = false
        };
    }
    return f1 || f2
}
    if (confirm("Отправить форму ?")) 
    {
        document.forms.anketaur.submit();
        return true;
    } else 
        return false;
}
