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
public class UtsAppDoctor{
    
    private String filePath;
    private Doctors doctors;
    
    public UtsAppDoctor() {
        
    }  
   
    public String getFileName() {
        return filePath;
    }
    
    public void setFilePath(String filePath) throws Exception  {                   
      this.filePath = filePath;
      JAXBContext jb = JAXBContext.newInstance(Doctors.class);
      Unmarshaller u = jb.createUnmarshaller();
      FileInputStream fin = new FileInputStream(filePath);
      doctors = (Doctors) u.unmarshal(fin);
      fin.close();
    }
    
   
    public Doctors getDoctors() {
	return doctors;
    }
    
    
    public void setDoctors(Doctors doctors) {
        this.doctors = doctors;
    }
    
    public void saveDoctors(Doctors doctors, String filePath) throws Exception {
        this.doctors = doctors;
        this.filePath = filePath;
        JAXBContext jc = JAXBContext.newInstance(Doctors.class);
        Marshaller m = jc.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        FileOutputStream fout = new FileOutputStream(filePath);
        m.marshal(doctors, fout);
        fout.close();
    }
    
     public void updateXML() throws Exception {

        JAXBContext jc = JAXBContext.newInstance(Doctors.class);
        Marshaller m = jc.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        FileOutputStream fout = new FileOutputStream(filePath);
        m.marshal(doctors, fout); //Marsahal those students back to the filePath
        fout.close();
    }
    
}
