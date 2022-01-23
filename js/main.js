window.addEventListener('DOMContentLoaded', (event) => {
      
      const fundationYear = 2020;
      const actualYear = ""+(new Date(document.lastModified).getYear()+1900);
      document.getElementById("existence").innerHTML = 
      (fundationYear!=actualYear) ? fundationYear+"-"+actualYear : actualYear;
      
      document.getElementById("existence").href= "http://tablica.fun/#Sowa i przyjaciele "+actualYear;
      
      });
