// ;(() => {
    function todolist(todolist) {

        if(todolist && todolist.nodeType === 1) {
            this.todolist = todolist
            this.tasks = todolist.querySelectorAll('.todolist__task')
            this.formWraps = todolist.querySelectorAll('.todolist__task__formWrap')
        } else {
            this.todolist = null
            this.tasks = null
            this.formWraps = null
        }

        //  taskDomString
        Object.defineProperty(this,'taskDomString',{
            value : `
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
                        <input type="date" name="DeadLineDay" class="todolist__task__formDay" >
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
            </form>`,
            writable: false,
            enumerable: false,
            configurable: false
        })
        

        // or 以下這主種風格
        // Object.defineProperty(this,'taskDomString',{
        //     get: function () {return this.__taskDomString__},
        //     enumerable: false
        // })
        // Object.defineProperty(this,__taskDomString__, {
        //     value: `
        //     `,
        //     writable : false,
        //     enumerable : false
        // })


        return this
    }

    todolist.prototype.updateTodolist = function (todolist) {
        todolist && todolist.nodeType === 1 ? this.todolist = todolist : ''
        this.tasks = this.todolist.querySelectorAll('.todolist__task')
        this.formWraps = this.todolist.querySelectorAll('.todolist__task__formWrap')
        return this.tasks
    }

    todolist.prototype.taskRemain = function () {
        let remainMessage = document.querySelector('.todolist__remain')
        $todolistTasks = document.querySelectorAll('.todolist__task')
        let remainTask = $todolistTasks.length - 1
        $todolistTasks.forEach(task => {
        task.className.includes('complete') ? remainTask-- : ''
        })  
        remainMessage.textContent = `${remainTask} task left`
    }


    // Event Listener
    // ▼ when click add task button 
    todolist.prototype.enterAddTask = function(e) {
        console.log('enter task add')
        let target = e.target
        let $taskAddForm = target.nextElementSibling
        $taskAddForm.style.setProperty('display','block')
        $taskAddForm.dataset['isedit'] = 1
        target.style.setProperty('display','none')
    }

    // form wraps show
    todolist.prototype.formWrapShow = function(e) {
        let wrap = e.target
        let $task = wrap.parentElement.parentElement
        let isediting = parseInt($task.dataset['isedit'])
        let istaskshow = parseInt($task.dataset['isshow'])
        istaskshow && !isediting ? wrap.classList.add('show') : ''
    }


    todolist.prototype.taskShow = function(target,currentTarget) {
        console.log('task show')
        let strs = ['todolist__task__tag','todolist__task__title','todolist__task__tagFeature']
        let witchStrIndex = 0
        let clickShow = false

        //支援還沒支持matches的舊版瀏覽器
        if(target.matches) {
            console.log('support matches')
            clickShow = strs.some( (str,index) => {
                target.matches(`.${str}`) ? witchStrIndex = index : ''
                return target.matches(`.${str}`)
            })

        }else {
            clickShow = strs.some( (str,index) => {
                target.className.split(' ').find(str) ? witchStrIndex = index : ''
                return target.className.split(' ').find(str)
            })
        }

        if(clickShow) {
            let $task = null , $tag = null
            switch (witchStrIndex) {
                case 0 :
                    $task = this.tasks[target.dataset['index']]
                    break;
                case 1 :
                    $tag = target.parentElement
                    $task = this.tasks[$tag.dataset['index']]
                    break;
                case 2 :
                    $tag = target.parentElement.parentElement
                    $task = this.tasks[$tag.dataset['index']]
                    break;
            }

            const $wraps = $task.querySelectorAll('.todolist__task__formWrap')
            let isShowing = parseInt($task.dataset['isshow'])
            let isEditing = parseInt($task.dataset['isedit'])

            isEditing ? '' : isShowing ? hidden($task,$wraps) : show($task,$wraps)
            
        }
        

        function show(task,wraps) {
            task.classList.add('show')
            task.dataset['isshow'] = 1
            wraps.forEach(wrap => {
                if(wrap.matches('.deadline')){return}
                wrap.style.setProperty('position','static')
            })
        }

        function hidden(task,wraps) {
            task.classList.remove('show')
            task.dataset['isshow'] = 0
            wraps.forEach(wrap => {
                wrap.style.removeProperty('position')

                //realy need?
                wrap.classList.remove('show')
            })
        }

        return this.taskShow
    }

    todolist.prototype.addListener = function (element,active,handler) {
        let isElements = element instanceof Array || element instanceof NodeList
        if(element && typeof active === 'string' && typeof handler === 'function') {
            isElements ?  element.forEach(ele => ele.addEventListener(active, e => handler(e))) : element.addEventListener(active,e => handler(e))    
        }
        return this
    }

    todolist.prototype.taskEdit = function (target,currentTarget,active){
        let $task = this.tasks[target.dataset['index']]
        const $wraps = $task.querySelectorAll('.todolist__task__formWrap')
        let isediting = parseInt($task.dataset['isedit'])

        // 如果index是0 = addTask的task and form
        // 2020 / 4 / 12 這裡的updateTask方法還沒出來
        // 還沒有時值上的修改
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

    todolist.prototype.taskStatus = function (target,currentTarget) {
        console.log('taskStatus')
        let $task = target.parentElement.parentElement.parentElement
        target.checked ? $task.classList.add('complete') : $task.classList.remove('complete')
        this.taskRemain();
    }

    todolist.prototype.taskStar = function (target,currentTarget) {
        // 這種找該特定、指定的task方式要改
        // 2020 / 4 / 12
        let $task = this.tasks[target.dataset['index']]

        
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


    todolist.prototype.taskAdd = function (target,currentTarget) {
        let $taskAddForm = target.parentElement.parentElement.parentElement
        let $dataForm = $taskAddForm.querySelector('todolist__task__form')
        let $inputs = Array.from($taskAddForm.querySelectorAll('input'))
        let $textarea = $taskAddForm.querySelector('textarea')
        let $addTaskBtn = $taskAddForm.previousElementSibling
        
        //show add task btn and close add task form
        $taskAddForm.style.removeProperty('display')
        $addTaskBtn.style.removeProperty('display')

        // put json data in localStroage
        let tasksCurrently = JSON.parse(localStorage.getItem('todolist')).tasks
        if(tasksCurrently) {
            // sort tasks json data
            tasksCurrently.sort((a ,b) => a.index - b.index)

            //get new task infomation
            //find index
            let index = tasksCurrently.find( (task,ind) => {
                let outLength = ind === tasksCurrently.length - 1
                return outLength ? task : tasksCurrently[ind + 1].index !== task.index + 1
            })['index']
            index === tasksCurrently.length - 1 ? index++ : ''

            // get title
            let title = $inputs.find(input => input.name === 'Title').value

            //get deadlineDay and deadlineTime
            let deadLineDay = $inputs.find(input => input.name === 'DeadLineDay').value.split('-').slice(1,3).join('/')

            //get fileName and fileTime
            let file = $inputs.find(input => input.name === 'UploadFile').files.item(0)
            let fileName = file.name
            let fileTime = 
            console.log(file)
            // 類似這樣存進localstorage
            // tasksCurrently.push({index: 3})
            localStorage.setItem('todolist',JSON.stringify({tasks: tasksCurrently}))
        }
    }

    todolist.prototype.init = function() {
        localStorage.setItem('todolist',JSON.stringify(
            {
                tasks : [
                    {
                        index: 2
                    },
                    {
                        index: 1
                    }
                ]
            }
        ))
        
        console.log(JSON.parse(localStorage.getItem('todolist')))
        return this
    }

    todolist.prototype.createTask = function (options) {
        let now = new Date()
        if(!options['index']){ 
            console.log('lost infomation: task index or index === 0')
            return null
        }

        let defaultTask = {
            index: 1,
            complete: false ,
            title : `${now.getFullYear} / ${now.getMonth() + 1} / ${now.getDate()}`,
            deadLineDay : '',
            // deadLineTime : '', // 尚未加進來 2020 / 4 / 12
            fileName : '',
            fileTime : '',
            description: '',
            star : 0 
        }

        let taskData = {}
        Object.keys(defaultTask).forEach(key => {
            taskData[key] = options[key] || defaultTask[key]
        })

        let task = document.createElement('div')
        task.innerHTML = this.taskDomString
        task.className = 'todolist__task'
        task.dataset['isshow'] = 0
        task.dataset['isedit'] = 0

        // 把全部有data-index的地方修改
        task.querySelectorAll('[data-index]').forEach(ele => {
            ele.dataset['index'] = taskData.index
        })
        // form wraps add event listener (transitionend)
        task.querySelectorAll('.todolist__taks__formWrap').forEach(wrap => {
            wrap.addEventListener('transitionend',e => this.formWrapShow(e))
        })
        

        return task
    }







    // module.exprts = todolist
// })()