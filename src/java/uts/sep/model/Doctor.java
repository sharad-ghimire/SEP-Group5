package uts.sep.model;

import javax.xml.bind.annotation.*;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "doctor")
public class Doctor implements Serializable {

	@XmlElement(name = "name")
	private String name;
        @XmlElement(name = "id")
	private String ID;
	@XmlElement(name = "password")
	private String password;

	public Doctor() {
            super();
	}

    public String getID() {
        return ID;
    }

    public void setID(String email) {
        this.ID = ID;
    }

    public Doctor(String name,String id,  String password) {
        this.name = name;
        this.ID = id;
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