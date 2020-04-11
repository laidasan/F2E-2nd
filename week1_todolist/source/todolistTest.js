const $todolist = document.querySelector('.todolist')
let todolistObj = new todolist($todolist)


function formWrapShow(e) {
    let wrap = e.target
    let $task = wrap.parentElement.parentElement
    let isediting = parseInt($task.dataset['isedit'])
    let istaskshow = parseInt($task.dataset['isshow'])
    console.log(wrap.querySelector('span').textContent)
    istaskshow && !isediting ? wrap.classList.add('show') : ''
}

function todolistClickHandler(e) {
    console.log('todolist click')
    let target = e.target
    let currentTarget = e.currentTarget
    let active  = checkActive(target,currentTarget)
    // console.log('active',active)
    switch(active) {
        case 'edit':
        case 'save':
            // taskEdit(target,currentTarget,active)
            console.log('edit,save')
            break;
        case 'show':
            console.log('show')
            todolistObj.taskShow(target,currentTarget)
            break;
        case 'status':
            console.log('status')
            // taskStatus(target,currentTarget)
            break;
        case 'star':
            console.log('star')
            // taskStar(target,currentTarget)
            break;
        case 'add':
            console.log('add')
            e.preventDefault()
            // taskAdd(target,currentTarget)
            break;
        default:
            console.log('todolistClick')
            break;
    }


    function checkActive(target) {
        let active = ''
        if(target.matches) {
            // console.log('support matches')
            target.matches('.edit') || target.value === 'cancel' ? active = 'edit' : active = 'show'
            target.matches('.star') ? active = 'star' : ''
            target.matches('.feature-add') ? active = '' : ''
        }else {
            target.className.includes('edit') ? active = 'edit' : active = 'show'
            target.className.includes('star') ? active = 'star' : ''
            target.className.includes('feature-add') ? active = '' : ''
        }
        target.getAttribute('type') === 'checkbox' ? active = 'status' : ''
        target.getAttribute('value') === 'add' ? active = 'add' : ''
        target.getAttribute('value') === 'save' ? active = 'save' : ''
        return active
    }
}

window.onload = function() {
    todolistObj.addListener(todolistObj.todolist,'click',todolistClickHandler)
    todolistObj.addListener(todolistObj.formWraps,'transitionend',formWrapShow)
}

