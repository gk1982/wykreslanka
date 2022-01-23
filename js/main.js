window.addEventListener('DOMContentLoaded', (event) => {
      
      document.getElementById("background").classList.add('endBackgroundPosition');
      
      const fundationYear = 2020;
      const actualYear = ""+(new Date(document.lastModified).getYear()+1900);
      document.getElementById("existence").innerHTML = 
      (fundationYear!=actualYear) ? fundationYear+"-"+actualYear : actualYear;
      
      document.getElementById("existence").href= "http://tablica.fun/#Sowa i przyjaciele "+actualYear;
      
      });