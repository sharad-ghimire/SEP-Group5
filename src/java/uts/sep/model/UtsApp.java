package uts.sep.model;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 *
 * @author srd
 */
public class UtsApp {
    
    private String filePath;
    private Students students;
    
    public UtsApp() {
        
    }  
   
    public String getFileName() {
        return filePath;
    }
    
    public void setFilePath(String filePath) throws Exception  {                   
      this.filePath = filePath;
      JAXBContext jb = JAXBContext.newInstance(Students.class);
      Unmarshaller u = jb.createUnmarshaller();
      FileInputStream fin = new FileInputStream(filePath);
      students = (Students) u.unmarshal(fin);
      fin.close();
    }
    
   
    public Students getStudents() {
	return students;
    }
    
    
    public void setStudents(Students students) {
        this.students = students;
    }
    
    public void saveStudents(Students students, String filePath) throws Exception {
        this.students = students;
        this.filePath = filePath;
        JAXBContext jc = JAXBContext.newInstance(Students.class);
        Marshaller m = jc.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        FileOutputStream fout = new FileOutputStream(filePath);
        m.marshal(students, fout);
        fout.close();
    }
    
     public void updateXML() throws Exception {

        JAXBContext jc = JAXBContext.newInstance(Students.class);
        Marshaller m = jc.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        FileOutputStream fout = new FileOutputStream(filePath);
        m.marshal(students, fout); //Marsahal those students back to the filePath
        fout.close();
    }
    
}
