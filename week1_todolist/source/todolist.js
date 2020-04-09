(() => {
    const $addTaskBtn = document.querySelector('.feature-add')
    const $todolist = document.querySelector('.todolist');
    let $todolistTasks = document.querySelectorAll('.todolist__task')
    // const $todolistTaskTags = document.querySelectorAll('.todolist__task__tag')
    const $todolistFormWrap = document.querySelectorAll('.todolist__task__formWrap')
    const $header = document.querySelector('.header')


    let $taskHtml = `
    <div class="todolist__task__tag" data-index="1">
                <h4 class="todolist__task__title heading-fourth">
                    <input type="checkbox" name="TaskCheckBox" class="todolist__task__checkbox">
                    <div class="todolist__task__tagFeature">
                        <i class="far fa-star todolist__task__tagFeatureStar star" data-index="1"></i>
                        <i class="fas fa-pen todolist__task__tagFeatureEdit edit" data-index="1"></i>
                    </div>
                    <span class="todolist__task__titleContent">title</span>
                    <input type="text" name="Title" placeholder="task title" class="todolist__task__titleInput">
                </h4>
                <div class="todolist__task__tagDescription"></div>
            </div>
            <form action="" class="todolist__task__form">
                <div class="todolist__task__formWrap deadline" data-type="Deadline">
                    <h5 class="todolist__task__formHeading heading-fifth">
                        <i class="far fa-calendar-alt"></i>
                        Deadline
                    </h5>
                    <div class="todolist__task__formGroup todolist__task__formGroup--2-1">
                        <input type="date" name="DeadlineDay" class="todolist__task__formDay" >
                    </div>
                    <div class="todolist__task__formGroup todolist__task__formGroup--2-1">
                        <a href="#" class="todolist__task__formTime">hh/mm</a>
                    </div>
                </div>
                <div class="todolist__task__formWrap file">
                    <h5 class="todolist__task__formHeading heading-fifth">
                        <i class="far fa-file"></i>
                        File
                    </h5>
                    <div class="todolist__task__formGroup todolist__task__formGroup--2-1">
                        <span class="todolist__task__form__fileInfo todolist__task__form__fileName">filename</span>
                        <span class="todolist__task__form__fileInfo todolist__task__form__fileTime">filetime</span>
                    </div>
                    <!--  for="UploadFile"  -->
                    <label class="todolist__task__formLabel todolist__task__formLabel--upload">
                        <input type="file" name="UploadFile" class="todolist__task__formUpload">
                        <i class="fas fa-plus"></i>
                    </label>
                </div>
                <div class="todolist__task__formWrap description">
                    <h5 class="todolist__task__formHeading heading-fifth">
                        <i class="far fa-comment-dots"></i>
                        description
                    </h5>
                    <!-- <input type="text"> -->
                    <textarea name="TaskDescription" rows="9" class="todolist__task__formDescription"></textarea>
                    <span class="todolist__task__formDescriptionShow"></span>
                </div>
                <div class="todolist__task__formGroup">
                    <button class="todolist__task__formButton todolist__task__formButton--cancel" value="cancel" type="reset" data-index="1">Cancel</button>
                    <button class="todolist__task__formButton todolist__task__formButton--save" value="save" type="submit" data-index="1">Save</button>
                </div>
            </form>`


    let iconDeadLine = 'far fa-calendar-alt' , iconFile = 'far fa-file' , iconDescription = 'far fa-comment-dots';
    

    
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

    //wrap transitionend show
    function formWrapShow(e) {
        let wrap = e.target
        let $task = wrap.parentElement.parentElement
        let isediting = parseInt($task.dataset['isedit'])
        let istaskshow = parseInt($task.dataset['isshow'])
        console.log(wrap.querySelector('span').textContent)
        istaskshow && !isediting ? wrap.classList.add('show') : ''


        //2020/4/8 未完成功能
        //如果沒有deadline / file / description的話，該項在taskShow 詳細資訊的時候就不會跳出來
        // istaskshow && !isediting ? (() => {
        //     if(wrap.querySelector('.todolist__task__form__fileName') || wrap.querySelector('.todolist__task__formDescriptionShow')) {
        //         wrap.querySelector('.todolist__task__form__fileName') ? wrap.querySelector('.todolist__task__form__fileName').textContent !== 'filename' ?  (() => {
        //             wrap.classList.add('show')
        //             wrap.style.removeProperty('max-height')
        //         })() : wrap.style.setProperty('max-height','0') : ''
        //         wrap.querySelector('.todolist__task__formDescriptionShow') ? wrap.querySelector('.todolist__task__formDescriptionShow').textContent ?  (() => {
        //             wrap.classList.add('show')
        //             wrap.style.removeProperty('max-height')
        //         })() : wrap.style.setProperty('max-height','0') : ''
        //     }
        // })() : ''
    }

    //計算被標記"已完成"的task
    function taskRemain() {
        let remainMessage = document.querySelector('.todolist__remain')
        $todolistTasks = document.querySelectorAll('.todolist__task')
        let remainTask = $todolistTasks.length - 1
        $todolistTasks.forEach(task => {
            task.className.includes('complete') ? remainTask-- : ''
        })  
        remainMessage.textContent = `${remainTask} task left`
    }

    function enterAddTask(target,currentTarget) {
        console.log('enter task')
        let $taskAdd = target.nextElementSibling
        $taskAdd.style.setProperty('display','block')
        $taskAdd.dataset['isedit'] = 1
        target.style.setProperty('display','none')
    }

    //update task infomation
    function updateTask(task,newTask) {
        console.log('Update Task')
        let now = new Date()
        let taskForm = task.querySelector('form')
        let taskInputs = task.querySelectorAll('input')
        let taskDescriptionInput = task.querySelector('textarea')
        let taskTitle = newTask ? newTask.querySelector('.todolist__task__titleContent') : task.querySelector('todolist__task__titleContent')
        let tagDescription = newTask ? newTask.querySelector('.todolist__task__tagDescription') : task.querySelector('.todolist__task__tagDescription')
        let taskFileName = newTask ? newTask.querySelector('.todolist__task__form__fileName') : task.querySelector('.todolist__task__form__fileName')
        let taskFileTime = newTask ? newTask.querySelector('.todolist__task__form__fileTime') : task.querySelector('.todolist__task__form__fileTime')
        let taskDescriptionShow = newTask ? newTask.querySelector('.todolist__task__formDescriptionShow') : task.querySelector('.todolist__task__formDescriptionShow')
        let taskFileUpload = newTask ? newTask.querySelector('.todolist__task__formUpload') : task.querySelector('.todolist__task__formUpload')
        if(newTask) {
            //if aadd newTask
            // taskTitle = newTask.querySelector('.todolist__task__titleContent')
            // tagDescription = newTask.querySelector('.todolist__task__tagDescription')
            // taskFileName = newTask.querySelector('.todolist__task__form__fileName')
            // taskFileTime = newTask.querySelector('.todolist__task__form__fileTime')
            // taskDescriptionShow = newTask.querySelector('.todolist__task__formDescriptionShow')
            taskInputs[1].value ? taskTitle.textContent = taskInputs[1].value : taskTitle.textContent = 'mission title'
            taskInputs[3].files[0] ? taskFileName.textContent = taskInputs[3].files[0].name : ''
            taskDescriptionShow.textContent = taskDescriptionInput.value
            updateTagDes(tagDescription,taskInputs[2].value,taskInputs[3].files[0],taskDescriptionInput.value)

            //maybe要處理檔案傳輸到後端
            taskInputs[3].files[0] ? (() => {
                let file = taskInputs[3].files.item(0)
                taskFileName.textContent = taskInputs[3].files[0].name
                taskFileTime.textContent = `${now.getFullYear()} / ${now.getMonth() + 1} / ${now.getDate()} / ${now.getHours()} : ${now.getMinutes()}`
                taskFileUpload.files[0] = file
            })() : ''
        }else {
            //edit old task

        }

        function updateTagDes(tagDes,deadlineTime,files,message) {
            deadlineTime ? (() => {
                let time = `${deadlineTime.split('-')[1]}/${deadlineTime.split('-')[2]}`
                let deadLineIcon = document.createElement('i')
                let span = document.createElement('span')
                deadLineIcon.appendChild(span)
                span.textContent = time
                deadLineIcon.className = iconDeadLine
                tagDes.appendChild(deadLineIcon)
                console.log(deadlineTime.split('-'))
            })() : ''
            files ? (() => {
                let fileIcon = document.createElement('i')
                fileIcon.className = iconFile
                tagDes.appendChild(fileIcon)
            })() : ''
            message ? (() => {
                let messageIcon = document.createElement('i')
                messageIcon.className = iconDescription
                tagDes.appendChild(messageIcon)
            })() : ''
        }
    }

   

    //click -> show description and file 
    function taskShow(target,currentTarget) {
        console.log('taskShowOrHidden')
        // let $task = currentTarget.firstElementChild

        //taskTag Click 或是 task__title Click的時候可以觸發Click
        let isTaskTagClick = target.matches ? target.matches('.todolist__task__tag') : target.className.match(/^todolist__task__tag$/)
        let isTitleClick = target.matches ? target.matches('.todolist__task__title') : target.className.split(' ').find(classname => classname === 'todolist__task__title')
        let isFeatureWrap = target.matches ? target.matches('.todolist__task__tagFeature') : target.className.split(' ').find(classname => classname === 'todolist__task__tagFeature')

        if(isTaskTagClick || isTitleClick || isFeatureWrap && target.dataset['index'] !== 0) {
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
    function taskEdit(target,currentTarget,active) {
        console.log('taskEdit')
        let $task = $todolistTasks[target.dataset['index']]
        const $wraps = $task.querySelectorAll('.todolist__task__formWrap')
        let isediting = parseInt($task.dataset['isedit'])

        //如果index是0 => addTask的task and form
        parseInt(target.dataset['index']) ? isediting ? (() => {
            if(active === 'edit') {
                escEdit()
            }else {
                console.log('save change')
                updateTask($task)
                escEdit()
            }
        })() : enterEdit() : escAddTask()

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

        function escAddTask() {
            $task.style.removeProperty('display')
            $task.previousElementSibling.style.removeProperty('display')
            console.log($task.previousElementSibling)
        }
        
    }

    //change task status(finish or not)
    function taskStatus(target,currentTarget) {
        console.log('taskStatus')
        let $task = target.parentElement.parentElement.parentElement
        target.checked ? $task.classList.add('complete') : $task.classList.remove('complete')
        taskRemain();
    }

    function taskStar(target,currentTarget) {
        let $task = $todolistTasks[target.dataset['index']]
        if(parseInt(target.dataset['index'])) {
            if(!$task.style.order) {
                target.classList.add('fas')
                target.style.setProperty('color','#f5a623')
                $task.style.setProperty('order','-1')
            }else {
                target.classList.remove('fas')
                target.style.removeProperty('color')
                $task.style.removeProperty('order')

            }
        }
    }

    function taskAdd(target,currentTarget) {
        console.log('task add')
        let newTask = document.createElement('div')
        newTask.className = 'todolist__task'
        newTask.innerHTML = $taskHtml
        newTask.dataset['isedit'] = 0
        newTask.dataset['isshow'] = 0
        newTask.querySelectorAll('.todolist__task__formWrap').forEach(wrap => {
            if(wrap.className.includes('deadline')){return}
            wrap.addEventListener('transitionend',e => {formWrapShow(e)})
        })
        let haveIndexEles = newTask.querySelectorAll('[data-index]')
        haveIndexEles.forEach(ele => ele.dataset['index'] = $todolistTasks.length)
        
        //update task infomation
        //2020/4/6
        updateTask($todolistTasks[0],newTask)
        console.log(newTask.querySelector('.todolist__task__formUpload').files)

        // currentTarget.appendChild(newTask)
        currentTarget.insertBefore(newTask,currentTarget.lastElementChild)
        $todolistTasks = document.querySelectorAll('.todolist__task')
        taskRemain()
        

        //close task add form
        let $task = target.parentElement.parentElement.parentElement
        let $form = $task.querySelector('form')
        let $featureAdd = $task.previousElementSibling
        $task.style.removeProperty('display')
        $featureAdd.style.removeProperty('display')
        $form.reset()
        $task.querySelector('.todolist__task__titleInput').value = ''
    }


    function todolistClickHandler(e) {
        let target = e.target
        let currentTarget = e.currentTarget
        let active  = checkActive(target,currentTarget)
        // console.log('active',active)
        switch(active) {
            case 'edit':
            case 'save':
                taskEdit(target,currentTarget,active)
                break;
            case 'show':
                taskShow(target,currentTarget)
                break;
            case 'status':
                taskStatus(target,currentTarget)
                break;
            case 'star': 
                taskStar(target,currentTarget)
                break;
            case 'add':
                e.preventDefault()
                taskAdd(target,currentTarget)
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
                target.matches('.star') ? active = 'star' : ''
                target.matches('.feature-add') ? active = '' : ''
            }else {
                target.className.includes('edit') ? active = 'edit' : active = 'show'
                target.className.includes('star') ? active = 'star' : ''
                target.className.includes('feature-add') ? active = '' : ''
            }
            target.getAttribute('type') === 'checkbox' ? active = 'status' : ''
            // console.log(target.getAttribute('value'))
            target.getAttribute('value') === 'add' ? active = 'add' : ''
            target.getAttribute('value') === 'save' ? active = 'save' : ''
            // target.matches('edit') || target.className.includes('edit') ? active = 'edit' : active = 'show'
            // target.getAttribute('type') === 'checkbox' ? active = 'status' : ''
            // target.matches('feature-add') || target.className.includes('feature-add') ? active = '' : ''
            return active
        }
    }



    // change page
    let lastActive = 'Task'
    let thisActive = 'Task'
    const pageContent = {
        pageTask : '',
        pageProcess : '',
        pageComplete : ''
    }

    function getChangePageActive(clickTarget) {
        let active = ''
        switch (clickTarget.dataset['active']) {
           case 'task':
               active = 'Task'
               break;
           case 'process':
               active = 'Process'
               break;
           case 'complete':
               active= 'Complete'
               break;
           default:
               console.log('get active')
               break;
       }
        return active
    }


    // 2020/4/9 change page 功能尚未完成
    function chage(e,active) {
        console.log('change')
        if(active === lastActive) {return}
        lastActive = thisActive
        thisActive = active
        // console.log(pageContent['pageTask'])

        if(pageContent[`page${thisActive}`] === '') {
            console.log('first change to this page')
            //這裡可以一在網頁讀取的時候做
            //但可能會耗效能與進網頁速率
            switch (thisActive) {
                case 'Task':
                    changeToTask(e)
                    break;
                case 'Process':
                    changeToProcess(e)
                    break;
                case 'Complete':
                    changeToComplete(e)
                    break;
            }
        }else {
            console.log('change Page')
            pageContent[`page${lastActive}`] = $todolist.innerHTML
            $todolist.innerHTML = pageContent[`page${thisActive}`]


            // $addTaskBtn = document.querySelector('.feature-add')
            // $todolist = document.querySelector('.todolist');
            // $todolistTasks = document.querySelectorAll('.todolist__task')
            // $todolistFormWrap = document.querySelectorAll('.todolist__task__formWrap')
            // addEventListen()
        }
    }

    function changePage(e) {
        e.preventDefault()
        let target  = e.target
        let isChange = target.matches ? target.matches('.nav__option') : target.className.includes('nav__option') 
        if(isChange) {
            let active = getChangePageActive(target)
            chage(e,active)
        }
    }


    function changeToTask(e) {
        $todolist.innerHTML = ''
    }
    
    function changeToComplete(e) {
        $todolist.innerHTML = ''
    }
    function changeToProcess(e) {
        $todolist.innerHTML = ''

    }
   

    function addEventListen() {
        $todolist.addEventListener('click',e => { todolistClickHandler(e) })
        $addTaskBtn.addEventListener('click',e => enterAddTask(e.target,e.currentTarget))
        $header.addEventListener('click',e => changePage(e))
    
        $todolistFormWrap.forEach(wrap => {
            if(wrap.dataset['type'] === 'Deadline'){return}
            wrap.addEventListener("transitionend",e => formWrapShow(e))
        })
    }
 
    
    window.onload = function () {
        // $todolist.addEventListener('click',e => { todolistClickHandler(e) })
        // $addTaskBtn.addEventListener('click',e => enterAddTask(e.target,e.currentTarget))
        // $header.addEventListener('click',e => changePage(e))
    
        // $todolistFormWrap.forEach(wrap => {
        //     if(wrap.dataset['type'] === 'Deadline'){return}
        //     wrap.addEventListener("transitionend",e => formWrapShow(e))
        // })
        addEventListen()
        taskRemain()
        pageContent['pageTask'] = $todolist.innerHTML
    }
    // $todolistFormWrap.forEach(wrap => {
    //     if(wrap.dataset['type'] === 'Deadline'){return}
    //     let $task = wrap.parentElement.parentElement
    //     wrap.addEventListener("transitionend",e => {
    //         let isediting = parseInt($task.dataset['isedit'])
    //         let istaskshow = parseInt($task.dataset['isshow'])
    //         console.log(istaskshow,isediting)
    //         istaskshow && !isediting ? e.target.classList.add('show') : console.log('not opening')
    //     })
    // })
})()