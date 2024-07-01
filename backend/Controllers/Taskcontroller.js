import { task } from "../Model/Taskmodel.js";

// Add Task
export const Taskaddcontroller ={
    taskadd: async(req,res)=>{
        const {taskname,taskdate,taskinfo,taskprogress,userId} = req.body;

        try {
            const existingtask = await task.findOne({taskname});
            if(existingtask){
              return  res.status(406).json('This Task Already Added');
            }else{
                const newtask = new task({
                    taskname,
                    taskdate,
                    taskinfo,
                    taskprogress,
                    userId
                })
                await newtask.save()
               return res.status(200).json(newtask)
            }
            
        } catch (error) {
            res.status(401).json(`error transaction failed at Taskaddcontroller:  ${error}`) 
        }
    }
}

// get all User Task
export const Taskgetusercontroller={
    taskgetuser: async(req,res)=>{
        const userId = req.user
        try {
            const getalltask = await task.find({userId})
            res.status(200).json(getalltask)
        } catch (error) {
            res.status(401).json(`error transaction failed at Taskgetusercontroller:  ${error}`) 
        }
    }
}

// Edit your Task
export const Taskeditcontroller={
    taskedit: async(req,res)=>{
        const userId = req.user;
        const {id} = req.params;
        const {taskname,taskdate,taskinfo,taskprogress} = req.body

        try {
            const updatetask = await task.findByIdAndUpdate({_id:id},{taskname,taskdate,taskinfo,taskprogress},{new:true});
            await updatetask.save()
            res.status(200).json(updatetask);
        } catch (error) {
            res.status(401).json(`error transaction failed at Taskgetusercontroller:  ${error}`)  
        }
    }
}

// Delete Task
export const Taskdeletecontroller ={
    taskdelete: async(req,res)=>{
        const {id} = req.params;
        try {
            const taskdelete = await task.findByIdAndDelete({_id:id})
            res.status(200).json(taskdelete)
        } catch (error) {
            res.status(401).json(`error transaction failed at Taskdeletecontroller:  ${error}`)  
        }
    }
}

// Task search
export const Tasksearchcontroller ={
    tasksearch: async(req,res)=>{
        const searchkey = req.query.searchkey || "";
        const query = {
            taskname:{$regex:searchkey,$options:"i"}
        }

        try {
            const findtask = await task.find(query)
            res.status(200).json(findtask)
        } catch (error) {
            res.status(401).json(`error transaction failed at Tasksearchcontroller:  ${error}`)  
        }
    }
}