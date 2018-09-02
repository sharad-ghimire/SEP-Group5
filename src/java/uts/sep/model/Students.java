package uts.sep.model;

/**
 *
 * @author sharad
 */
import java.util.*;
import java.io.Serializable;
import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="students")
public class Students implements Serializable {
    
    
    @XmlElement(name = "student")
    private ArrayList<Student> studentList = new ArrayList<Student>();
 
    
    public ArrayList<Student> getList() {
        return studentList;
    }
    public void addStudent(Student student) {
        this.studentList.add(student);
    }
    public void removeUser(Student student) {
        this.studentList.remove(student);
    }
    
    public Student login(String id, String password) {
        for (Student student : studentList) {
            if (student.getID().equals(id) && student.getPassword().equals(password))
                return student; // Login correct. Return this student.
        }
        return null; // Login incorrect. Return null.
    }
    
}