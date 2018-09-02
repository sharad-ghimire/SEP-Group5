package uts.sep.model;

/**
 *
 * @author robin
 */
import java.util.*;
import java.io.Serializable;
import javax.xml.bind.annotation.*;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name="doctors")
public class Doctors implements Serializable {
    
    
    @XmlElement(name = "doctor")
    private ArrayList<Doctor> doctorList = new ArrayList<Doctor>();
 
    
    public ArrayList<Doctor> getList() {
        return doctorList;
    }
    public void addDoctor(Doctor doctor) {
        this.doctorList.add(doctor);
    }
    public void removeUser(Doctor doctor) {
        this.doctorList.remove(doctor);
    }
    
    public Doctor login(String id, String password) {
        for (Doctor doctor : doctorList) {
            if (doctor.getID().equals(id) && doctor.getPassword().equals(password))
                return doctor; // Login correct. Return this student.
        }
        return null; // Login incorrect. Return null.
    }
    
}