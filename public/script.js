var l1 = true
var l2 = true
var data = { birth: '', city: '', subjects: [], authors: [], degree: '' }
var subjects = []
var authors = []
var degree = document.getElementById('degree').value;






addHTML1 = () => {
    l1 = false
    document.getElementById('btn1').disabled = true;
    document.getElementById('div1').innerHTML =
        `
                <div class="body">
                    <textarea class="input" id="subject"></textarea>
                </div>
                <div class="buttons" style="margin: auto;">
                    <button class="button" type="button" onclick="Cancel1()">X</button>
                    <button class="button" id="but1" type="button" onclick="Done1()">تم</button>
                </div>
                `
    document.getElementById('submit').disabled = true
    document.getElementById('reset').disabled = true
}
Cancel1 = () => {
    document.getElementById('div1').innerHTML = null
    document.getElementById('btn1').disabled = false
    l1 = true
    if (l2) {
        document.getElementById('submit').disabled = false
        document.getElementById('reset').disabled = false
    }
}
Done1 = () => {
    l1 = true
    var subject = document.getElementById('subject')
    if (!subject.value) {
        alert('رجاءً أدخل المعلومات المطلوبة')
    } else {
        subject.disabled = true
        subjects.push(subject.value)
        document.getElementById(`but1`).disabled = true
        document.getElementById('btn1').disabled = false
        console.log(subjects)
        if (l2) {
            document.getElementById('submit').disabled = false
            document.getElementById('reset').disabled = false
        }
    }
}
addHTML2 = () => {
    l2 = false
    document.getElementById('btn2').disabled = true;
    document.getElementById('div2').innerHTML =
        `
                <div class="body">
                    <textarea class="input" id="author"></textarea>
                </div>
                <div class="buttons" style="margin: auto;">
                    <button class="button" type="button" onclick="Cancel2()">X</button>
                    <button class="button" id="but2" type="button" onclick="Done2()">تم</button>
                </div>
                `
    document.getElementById('submit').disabled = true
    document.getElementById('reset').disabled = true
}
Cancel2 = () => {
    document.getElementById('div2').innerHTML = null
    document.getElementById('btn2').disabled = false
    l2 = true
    if (l1) {
        document.getElementById('submit').disabled = false
        document.getElementById('reset').disabled = false
    }
}
Done2 = () => {
    l2 = true
    var author = document.getElementById('author')
    if (!author.value) {
        alert('رجاءً أدخل المعلومات المطلوبة')
    } else {
        author.disabled = true
        authors.push(author.value)
        document.getElementById(`but2`).disabled = true
        document.getElementById('btn2').disabled = false
        console.log(authors)
        if (l1) {
            document.getElementById('submit').disabled = false
            document.getElementById('reset').disabled = false
        }
    }
}
$(document).ready(function () {
    $("#from-datepicker").datepicker({
        format: 'yyyy-mm-dd' //can also use format: 'dd-mm-yyyy'     
    });
});
$(document).ready(() => {
    $("#submit").click(() => {
        birth = document.getElementById('from-datepicker').value;
        city = document.getElementById('city').value;
        degree = document.getElementById('degree').value;
        data = { birth, city, subjects, authors, degree }
        console.log(data)
        $.post("/request",
            {
                data: data
            },
            (info, status) => {
                console.log(info);
                console.log(status);
            });
    });
});
