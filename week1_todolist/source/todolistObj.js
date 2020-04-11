// ;(() => {
    function todolist(todolist) {

        if(todolist && todolist.nodeType === 1) {
            // console.log('have todolist')
            this.todolist = todolist
            this.tasks = todolist.querySelectorAll('.todolist__task')
            this.formWraps = todolist.querySelectorAll('.todolist__task__formWrap')
        } else {
            this.todolist = null
            this.tasks = null
            this.formWraps = null
        }
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


    todolist.prototype.taskShow = function (target,currentTarget) {
        console.log('task show')
        console.log(target)
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
            console.log('click to show')
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
    todolist.prototype.init = function() {

    }

    // module.exprts = todolist
// })()