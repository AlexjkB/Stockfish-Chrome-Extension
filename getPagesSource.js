// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function createFEN(str) {
	var start = str.search("class=\"piece");
	var pieces = str.splice(start, start + 1211);
	/*
	var end = start + 1211;
	var ii;
	var pieces = str.slice(start, end).split("class=\"piece ");
	let pos = []
	var currStr = ""
	for (ii = 0; ii < pieces.length; ii++) {
		currStr = pieces[ii]
		pos.push((currStr.splice(11, 12).concat(currStr.splice(10, 11))).concat(currStr.splice(0, 2)));
	}
	pos.sort();
	*/
	return pieces
	
	
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});