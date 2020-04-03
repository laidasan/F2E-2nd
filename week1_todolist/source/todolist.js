(() => {
    const $addTaskBtn = document.querySelector('.feature-add')
    const $todolist = document.querySelector('.todolist');
    const $todolistTasks = document.querySelectorAll('.todolist__task')
    const $todolistTaskTags = document.querySelectorAll('.todolist__task__tag')
    const $todolistFormWrap = document.querySelectorAll('.todolist__task__formWrap')
    const edit = 'todolist__task--edit'



    //task show description and file
    function show($task,$wraps) {
        console.log('task show')
        $task.classList.add('show')
        $task.dataset['isshow'] = 1
        $wraps.forEach(wrap => {
            if(wrap.matches('.deadline')){return}
            wrap.style.setProperty('position','static')
        })
    }

    //task hidden description and file
    function hidden($task,$wraps) {
        console.log('task hidden')
        $wraps.forEach(wrap => {
            wrap.classList.remove('show')
            wrap.style.removeProperty('position')
        })
        $task.classList.remove('show')
        $task.dataset['isshow'] = 0
    }

   

    //click -> show description and file 
    function taskShow(target,currentTarget) {
        console.log('taskShowOrHidden',target,currentTarget)
        // let $task = currentTarget.firstElementChild

        //taskTag Click 或是 task__title Click的時候可以觸發Click
        let isTaskTagClick = target.matches ? target.matches('.todolist__task__tag') : target.className.match(/^todolist__task__tag$/)
        let isTitleClick = target.matches ? target.matches('.todolist__task__title') : target.className.split(' ').find(classname => classname === 'todolist__task__title')
        let isFeatureWrap = target.matches ? target.matches('.todolist__task__tagFeature') : target.className.split(' ').find(classname => classname === 'todolist__task__tagFeature')

        if(isTaskTagClick || isTitleClick || isFeatureWrap) {
            // let $task = isTitleClick ? $todolistTasks[target.parentElement.dataset['index']] : $todolistTasks[target.dataset['index']]
            let $task = isTaskTagClick ? $todolistTasks[target.dataset['index']] : (() => {
                return isTitleClick ? $todolistTasks[target.parentElement.dataset['index']] : $todolistTasks[target.parentElement.parentElement.dataset['index']]
            })()

            const $wraps = $task.querySelectorAll('.todolist__task__formWrap')
            let isshowing = parseInt($task.dataset['isshow'])
            let isediting = parseInt($task.dataset['isedit'])
            isediting ? '' : isshowing ? hidden($task,$wraps) : show($task,$wraps)
        }
    }

    //enter task edit mode
    function taskEdit(target,currentTarget) {
        console.log('taskEdit',target,currentTarget)
        let $task = $todolistTasks[target.dataset['index']]
        const $wraps = $task.querySelectorAll('.todolist__task__formWrap')
        let isediting = parseInt($task.dataset['isedit'])
        isediting ? escEdit() : enterEdit()

        function enterEdit() {
            console.log('enter edit')
            $task.dataset['isedit'] = 1
            $task.classList.add('edit')
            $wraps.forEach(wrap => wrap.classList.remove('show'))
        }

        function escEdit() {
            console.log('esc edit')
            $task.dataset['isedit'] = 0
            $task.classList.remove('edit')
        }
        
    }

    //change task status(finish or not)
    function taskStatus(target,currentTarget) {
        console.log('taskStatus',target,currentTarget)
        let $task = target.parentElement.parentElement.parentElement
        console.log($task)
        target.checked ? $task.classList.add('complete') : $task.classList.remove('complete')
    }

    function todolistClickHandler(e) {
        let target = e.target
        let currentTarget = e.currentTarget
        let active  = checkActive(target,currentTarget)
        // console.log('active',active)
        switch(active) {
            case 'edit':
                taskEdit(target,currentTarget)
                break;
            case 'show':
                taskShow(target,currentTarget)
                break;
            case 'status':
                taskStatus(target,currentTarget)
                break;
            default:
                console.log('todolistClick')
                break;
        }


        function checkActive(target) {
            let active = ''
            if(target.matches) {
                console.log('support matches')
                target.matches('.edit') || target.value === 'cancel' ? active = 'edit' : active = 'show'
                target.matches('.feature-add') ? active = '' : ''
            }else {
                target.className.includes('edit') ? active = 'edit' : active = 'show'
                target.className.includes('feature-add') ? active = '' : ''
            }
            target.getAttribute('type') === 'checkbox' ? active = 'status' : ''
            // target.matches('edit') || target.className.includes('edit') ? active = 'edit' : active = 'show'
            // target.getAttribute('type') === 'checkbox' ? active = 'status' : ''
            // target.matches('feature-add') || target.className.includes('feature-add') ? active = '' : ''
            return active
        }
    }


    function addTask(e) {
        let target = e.target
        let $taskAdd = target.nextElementSibling
        $taskAdd.style.setProperty('display','block')
        console.log(target.nextElementSibling)
    }


    $todolist.addEventListener('click',e => { todolistClickHandler(e) })
    $addTaskBtn.addEventListener('click',e => addTask(e))


    $todolistFormWrap.forEach(wrap => {
        if(wrap.dataset['type'] === 'Deadline'){return}
        let $task = wrap.parentElement.parentElement
        wrap.addEventListener("transitionend",e => {
            let isediting = parseInt($task.dataset['isedit'])
            let istaskshow = parseInt($task.dataset['isshow'])
            console.log(istaskshow,isediting)
            istaskshow && !isediting ? e.target.classList.add('show') : console.log('not opening')
        })
    })







    // warzone




    //2020/4/2
    //用事件委派，在todolist(最頂層)addEventListener，不要在task上
    // $todolistTasks.forEach(task => {
    //     task.addEventListener('click',(e) => {
    //         let target = e.target
    //         let currentTarget = e.currentTarget
    //         console.log(currentTarget)
    //         let isEditActive = target.matches('.edit')
    //         if(isEditActive) {
    //             console.log('edit active')
    //             let index = target.dataset['index']
    //             let isediting = parseInt(currentTarget.dataset['isedit'])
    //             if(isediting) {
    //                 console.log('esc edit')
    //                 currentTarget.dataset['isedit'] = 0
    //                 $todolistTasks[index].classList.remove(`${edit}`)
    //                 const wraps = currentTarget.querySelectorAll('.todolist__task__formWrap')
    //             }else {
    //                 console.log('enter edit')
    //                 currentTarget.dataset['isedit'] = 1
    //                 $todolistTasks[index].classList.add(`${edit}`)
    //                 $todolistFormWrap.forEach(wrap => wrap.classList.remove('show'))
    //             }
    //         }
    //         // console.log(target)
    //     })
    

        //mousehover 單個效果好 但是多個task效果差
        //因為是高度改變，會推擠next task，使用體驗不好
        //改成click看看
        //2020/4/2
    //     task.addEventListener('mouseover',(e) => {
    //         let target = e.target
    //         let currentTarget = e.currentTarget
    //         let isTask = target.matches('.todolist__task__tag') || target.matches('.todolist__task__form')
            
    //         let isediting = parseInt(currentTarget.dataset['isedit'])
    //         console.log(currentTarget)
    //         if(isTask && !isediting){
    //             console.log('isTaskTag show')
    //             isTaskTagOpen = true
    //             const wraps = currentTarget.querySelectorAll('.todolist__task__formWrap')
    //             for(let i = 0;i < 3;i++) {
    //                 wraps[i].style.setProperty('position','static')
    //             }
    //         }else {
    //             console.log('open fail')
    //         }
    
    //     })
    
    //     task.addEventListener('mouseleave',(e) => {
    //         let target = e.target
    //         let isTask = target.matches('.todolist')
    //         let isediting = parseInt(target.dataset['isedit'])
    //         isTaskTagOpen = false
    
    //         if(isTask && !isediting) {
    //             console.log('isTaskTag hidden')
    //             const wraps = target.parentElement.querySelectorAll('.todolist__task__formWrap')
    //             wraps.forEach(wrap => wrap.classList.remove('show'))
    //         }
    //     })
    // })








    // $todolist.addEventListener('click',(e) => {
    //     let target = e.target
    //     let currentTarget = e.currentTarget
    //     console.log(currentTarget)
    //     let isEditActive = target.matches('.edit')
    //     if(isEditActive) {
    //         console.log('edit active')
    //         let index = target.dataset['index']
    //         let isediting = parseInt(currentTarget.dataset['isedit'])
    //         if(isediting) {
    //             console.log('esc edit')
    //             currentTarget.dataset['isedit'] = 0
    //             $todolistTasks[index].classList.remove(`${edit}`)
    //             const wraps = currentTarget.querySelectorAll('.todolist__task__formWrap')
    //         }else {
    //             console.log('enter edit')
    //             currentTarget.dataset['isedit'] = 1
    //             $todolistTasks[index].classList.add(`${edit}`)
    //             $todolistFormWrap.forEach(wrap => wrap.classList.remove('show'))
    //         }
    //     }
    //     // console.log(target)
    // })

    // $todolist.addEventListener('mouseover',(e) => {
    //     let target = e.target
    //     let currentTarget = e.currentTarget
    //     let isTask = target.matches('.todolist__task__tag') || target.matches('.todolist__task__form')
        
    //     let isediting = parseInt(currentTarget.dataset['isedit'])
    //     console.log(currentTarget)
    //     if(isTask && !isediting){
    //         console.log('isTaskTag show')
    //         isTaskTagOpen = true
    //         const wraps = currentTarget.querySelectorAll('.todolist__task__formWrap')
    //         for(let i = 0;i < 3;i++) {
    //             wraps[i].style.setProperty('position','static')
    //         }
    //     }else {
    //         console.log('open fail')
    //     }

    // })

    // $todolist.addEventListener('mouseleave',(e) => {
    //     let target = e.target
    //     let isTask = target.matches('.todolist')
    //     let isediting = parseInt(target.dataset['isedit'])
    //     isTaskTagOpen = false

    //     if(isTask && !isediting) {
    //         console.log('isTaskTag hidden')
    //         const wraps = target.parentElement.querySelectorAll('.todolist__task__formWrap')
    //         wraps.forEach(wrap => wrap.classList.remove('show'))
    //     }
    // })

    // $todolistFormWrap.forEach(wrap => {
    //     if(wrap.dataset['type'] === 'Deadline'){return}
    //     let $task = wrap.parentElement.parentElement
    //     let isediting = parseInt($task.dataset['isedit'])
    //     wrap.addEventListener("transitionend",e => {
    //         console.log('transitionend')
    //         console.log('add show')
    //         console.log('wrap event listener',$task)
    //         console.log('isediting',isediting)
    //         isTaskTagOpen && !isediting ? e.target.classList.add('show') : console.log('not opening')
    //     })
    // })
})()