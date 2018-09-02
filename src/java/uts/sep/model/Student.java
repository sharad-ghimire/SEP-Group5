package uts.sep.model;

import javax.xml.bind.annotation.*;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "student")
public class Student implements Serializable {

	@XmlElement(name = "name")
	private String name;
        @XmlElement(name = "id")
	private String ID;
	@XmlElement(name = "password")
	private String password;
        @XmlElement(name = "age")
	private String age;
        @XmlElement(name = "condition")
	private String condition;
                
    public Student() {
	super();
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
        

	
    public String getID() {
        return ID;
    }

    public void setID(String email) {
        this.ID = ID;
    }

    public Student(String name,String id, String password, String age, String condition ) {
        this.name = name;
        this.ID = id;
        this.password = password;
        this.age=age;
        this.condition=condition;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
	
}