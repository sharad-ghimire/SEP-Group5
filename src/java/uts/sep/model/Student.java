package uts.sep.model;

import javax.xml.bind.annotation.*;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "student")
public class Student implements Serializable {

	@XmlElement(name = "name")
	private String name;
	@XmlElement(name = "password")
	private String password;
        @XmlElement(name = "email")
	private String email;
	
	public Student() {
		super();
	}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Student(String name, String password) {
        this.name = name;
        this.password = password;
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