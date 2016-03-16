(function() 
    {

      document.addEventListener("trix-change", function(event) 
      {
        var editor, editorElement;
        editorElement = event.target;
        editor = editorElement.editor;

        var doc = editor.getDocument().toString();
        var len = doc.length;
        var char = doc.charAt(len - 2);  // whytf is this 2????

        // newline
        if( char == '\n' )
        {
          if( editorElement.id == "notes-editor" )
          {
            var time, attendeeBox, notesBox;
            
            time = Date.prototype.timeNow

            attendeeBox = document.querySelector("#current-attendee");
            attendee = attendeeBox.value;
            attendeeBox.value = "";

            notesBox = document.querySelector("#notes-saved");

            if(notesHidden)
            {
              notesBox.classList.remove("hidden");

              notesHidden = false;
            }
            else
            {
              notesBox.editor.insertString("\n\n");
            }

            notesBox.editor.insertString(getTime() + " " + attendee + "\n" + doc.slice(0,len-2));

            editor.setSelectedRange([0, len]);
            editor.deleteInDirection("backward");

            attendeeBox.focus();
          }
          else if( editorElement.id == "attendees-editor" )
          {
            var attendee = doc.slice(0,len-2);
            add_attendee(attendee);

            editor.setSelectedRange([0, len]);
            editor.deleteInDirection("backward");
          }
        }
        else
        {
          // ---
        }
      });
    }).call(this);

    var notesHidden = true;


    function getTime()
    {
      var currentdate = new Date(); 
      var datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();

      return datetime;
    }

    var input = document.getElementById("current-attendee");
    var awesomplete = new Awesomplete(input);
    var attendees = [];

    function add_attendee(attendee) 
    {
      var ul = document.getElementById("attendees");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(attendee));
      ul.appendChild(li);

      attendees.push(attendee);
      awesomplete.list = attendees;
    }
