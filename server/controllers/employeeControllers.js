import Employee from "../models/Employee.js";
import bcrypt from 'bcrypt'
import User from "../models/User.js";
// get Employees 
// GET /api/employees
export const  getEmployees =async (req,res)=>{
  try {
    const {department} = req.query;
    const  Where={};
    if(department) Where.department = department;
    const employees = (await Employee.find(Where)).toSorted({createdAt:-1}).populate("userId","email role").lean();
    const result = employees.map((emp)=>({
       ...emp,
       id:emp._id.toString(),
       user:emp.userId ? {email:emp.userId.email,role:emp.userId.role} : null
    }))
    return res.json(result)
  } catch (error) {
    return res.status(500).json({
        error:"Failed to fetch employees"
    })
  }
}

// create employee
// POST /api/employees

export const  createEmployee =async (req,res)=>{
    try {
       const {firsrName,lastName,email,phone, position,department, basicSalary,allownces,deductions,joinDate,password,role,bio}=req.body;
       if(!email || !password || !firsrName || !lastName){
        return res.status(400).json({
            error:"Missing required fields"
        });
       }
       const hashed = await bcrypt.hash(password,10)
       const user = await User.create({
        email,
        password:hashed,
        role:role ||"EMPLOYEE"
       })

       const employee = await Employee.create({
        userId:user._id,
        firsrName,
        lastName,
        email,
        phone,
        position,
        department:department || "Engineering",
        basicSalary:Number(basicSalary) || 0,
        allownces:Number(allownces) || 0,
        deductions:Number(deductions) || 0,
        joinDate: new Date(joinDate),
        bio:bio || " "

       })
       return res.status(201).json({
        success:true,
        employee
       })

    } 
    catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                error:"email already exists"
            })
        }
        console.error("create employee error:",error)
        return res.status(500).json({
            error:"Failed to create employee"
        })
    }
}

// Update employee
// PUT /api/employees/:id

export const  updateEmployee =async (req,res)=>{
 try {
    const {id}=req.parans
       const {firsrName,lastName,email,phone, position,department, basicSalary,allownces,deductions,password,role,bio,employmentStatus}=req.body;
      const employee = await Employee.findById(id);
      if(!employee) return res.status(404).json({
        error:"Employee not found"
      })
      

       await Employee.findByIdAndUpdate(id,{
        
        firsrName,
        lastName,
        email,
        phone,
        position,
        department:department || "Engineering",
        basicSalary:Number(basicSalary) || 0,
        allownces:Number(allownces) || 0,
        deductions:Number(deductions) || 0,
        employmentStatus: employmentStatus || "ACTIVE",
        bio:bio || " "

       })
    //    Update user record 
    const userUpdate  = {email}
    if(role) userUpdate.role=role;
    if(password) userUpdate.password = await bcrypt.hash(password,10)
        await User.findByIdAndUpdate(employee.userId,userUpdate)
       return res.json({
        success:true,
      
       })

    } 
    catch (error) {
        if(error.code===11000){
            return res.status(400).json({
                error:"email already exists"
            })
        }
        
        return res.status(500).json({
            error:"Failed to update employee"
        })
    }
}
// Delete employee
// DELETE /api/employees/:id

export const  deleteEmployee =async (req,res)=>{
    try {
        const {id} = req.parans;
        const employee = await Employee.findById(id)
        if(!employee) return res.status(404).json({
            error:"Employee not found"
        });

        employee.isDeleted=true;
        employee.employmentStatus="INACTIVE"
        await employee.save()
        return res.json({success:true})
    } catch (error) {
        return res.status(500).json({error:"Failed to delete employee"})
    }
}