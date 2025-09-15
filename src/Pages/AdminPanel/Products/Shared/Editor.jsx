import React, { useRef, useEffect} from "react";
import {
  FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaListOl,
  FaLink, FaImage, FaCode, FaQuestionCircle
} from "react-icons/fa";

export default function RichTextEditor({ content, setContent, formData, handleInputChange, loading, handleCancelClick, isEditMode}) {
  const editorRef = useRef(null);
  // const [content, setContent] = useState(""); //using lifting state up,  instead of use it sate, we use parent state

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content || '';
    }
  }, []); // Run once on mount


  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setContent(editorRef.current.innerHTML); // update state after command
  };

  const handleInput = () => {
    setContent(editorRef.current.innerHTML); // update state on typing
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
        Description *
      </label>

      <div className="border border-gray-300 rounded-lg">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg space-x-1">
          <button onClick={() => handleCommand("undo")} className="p-2 rounded hover:bg-gray-200">
            <FaUndo />
          </button>
          <button onClick={() => handleCommand("redo")} className="p-2 rounded hover:bg-gray-200">
            <FaRedo />
          </button>
          <button onClick={() => handleCommand("bold")} className="p-2 rounded hover:bg-gray-200">
            <FaBold />
          </button>
          <button onClick={() => handleCommand("italic")} className="p-2 rounded hover:bg-gray-200">
            <FaItalic />
          </button>
          <button onClick={() => handleCommand("underline")} className="p-2 rounded hover:bg-gray-200">
            <FaUnderline />
          </button>
          <button onClick={() => handleCommand("strikeThrough")} className="p-2 rounded hover:bg-gray-200">
            <FaStrikethrough />
          </button>

          <button onClick={() => handleCommand("justifyLeft")} className="p-2 rounded hover:bg-gray-200">
            <FaAlignLeft />
          </button>
          <button onClick={() => handleCommand("justifyCenter")} className="p-2 rounded hover:bg-gray-200">
            <FaAlignCenter />
          </button>
          <button onClick={() => handleCommand("justifyRight")} className="p-2 rounded hover:bg-gray-200">
            <FaAlignRight />
          </button>
          <button onClick={() => handleCommand("insertUnorderedList")} className="p-2 rounded hover:bg-gray-200">
            <FaListUl />
          </button>
          <button onClick={() => handleCommand("insertOrderedList")} className="p-2 rounded hover:bg-gray-200">
            <FaListOl />
          </button>
          <button onClick={() => handleCommand("createLink", prompt("Enter URL:"))} className="p-2 rounded hover:bg-gray-200">
            <FaLink />
          </button>
          <button onClick={() => handleCommand("insertImage", prompt("Enter image URL:"))} className="p-2 rounded hover:bg-gray-200">
            <FaImage />
          </button>
          <button onClick={() => handleCommand("insertHTML", "<pre><code>Code</code></pre>")} className="p-2 rounded hover:bg-gray-200">
            <FaCode />
          </button>
          <button className="p-2 rounded hover:bg-gray-200">
            <FaQuestionCircle />
          </button>
        </div>

        {/* Editable Area */}
        <div
          ref={editorRef}
          id="description"
          contentEditable
          onInput={handleInput}
          className="w-full p-4 border-0 focus:ring-0 rounded-b-lg min-h-[200px] outline-none"
        ></div>
      </div>

        {/* Status Toggle */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <div className="flex items-center gap-3">
                <div className="relative inline-block w-12 h-6">
                  <input
                    className="sr-only"
                    id="toggle"
                    name="status"
                    type="checkbox"
                    checked={formData.status}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <label
                    htmlFor="toggle"
                    className={`block w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                      formData.status ? 'bg-green-500' : 'bg-gray-300'
                    } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                        formData.status ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </label>
                </div>
                <span className="text-sm text-gray-600">
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCancelClick}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isEditMode ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  isEditMode ? 'Update' : 'Create'
                )}
              </button>
            </div>
     
    
    </div>
  );
}
