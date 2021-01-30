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

function findPieces(str) {
	var start = str.search("class=\"piece");
	var pieces = str.slice(start, start + 5000);
	
	var ii;
	var pieces = str.slice(start, start + 5000).split("class=\"piece ");
	let pos = []
	var currStr = ""
	for (ii = 0; ii < pieces.length; ii++) {
		currStr = pieces[ii]
		var p = currStr.search(".png")
		pos.push((currStr.slice(10, 11).concat(currStr.slice(8, 9))).concat(currStr.slice(p-2, p)));
	}
	pos.shift();
	pos.sort().reverse();
	
	
	return pos
	
	
}

function translateToFEN(array) {
	var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
		ii = 0,
        kk = 0,
		fenArray = [],
        //array = ["88br","84bk","78bp","77bp","76bp","72bp","55bp","53bb","51bp","41wp","34bq","15wk"],
		counter = 0;
        
	let pieceMap = new Map()
	pieceMap.set('wr', 'R')
	pieceMap.set('wn', 'N')
	pieceMap.set('wb', 'B')
	pieceMap.set('wq', 'Q')
	pieceMap.set('wk', 'K')
	pieceMap.set('wp', 'P')
	pieceMap.set('br', 'r')
	pieceMap.set('bn', 'n')
	pieceMap.set('bb', 'b')
	pieceMap.set('bq', 'q')
	pieceMap.set('bk', 'k')
	pieceMap.set('bp', 'p')
    console.log(array)
	for (ii = 8; ii > 0; ii--) {
		fenArray.push([]);
		for (kk = 8; kk > 0; kk--) {
            if (counter == array.length) {
                fenArray[8-ii].push("1")
            } else if (array[counter].slice(0, 1) == ii && array[counter].slice(1, 2) == kk) {
				fenArray[8-ii].push(pieceMap.get(array[counter].slice(2, 4)));
				counter++;
			} else {
                fenArray[8-ii].push("1")
            }

		}
		fenArray[8-ii].reverse();
	}
    console.log(fenArray)
	return fenArray
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: translateToFEN(findPieces(DOMtoString(document)))
});