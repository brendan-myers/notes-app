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
              notesBox.editor.insertLineBreak();
              notesBox.editor.insertLineBreak();
              notesBox.editor.insertLineBreak();
            }

            // insert time
            notesBox.editor.insertString(getTime() + "\t");
             
            // insert attendee
            notesBox.editor.activateAttribute("italic");
            notesBox.editor.insertString(attendee);
            notesBox.editor.deactivateAttribute("italic");

            // insert note
            notesBox.editor.insertLineBreak();
            notesBox.editor.activateAttribute("quote");
            notesBox.editor.increaseIndentationLevel();
            notesBox.editor.insertString("\t\t" + doc.slice(0,len-2));
            notesBox.editor.deactivateAttribute("quote");
            //notesBox.editor.decreaseIndentationLevel();

            // clear newline character
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
    //
    // Helpers
    //

    function getTime()
    {
      var currentdate = new Date(); 
      var datetime = pad(currentdate.getHours(),2) + ":"  
                   + pad(currentdate.getMinutes(),2) + ":" 
                   + pad(currentdate.getSeconds(),2);

      return datetime;
    }

    function pad(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    var fs = require('fs'); // require only if you don't already have it

    function saveFile () 
    {
      dialog.showSaveDialog({ filters: [{ name: 'text', extensions: ['txt'] }]}, function (fileName) 
      {
        if (fileName === undefined) return;
    
        var doc = document.querySelector("#notes-saved").editor.getDocument().toString();
        fs.writeFile(fileName, doc, function (err) {});
      }); 
    }
