function translateAddress() {
    const numPages = parseInt(document.getElementById('numPages').value);
    const framesPerPage = parseInt(document.getElementById('framesPerPage').value);
    const pageSize = parseInt(document.getElementById('pageSize').value);
    const page = parseInt(document.getElementById('page').value);
    const frame = parseInt(document.getElementById('frame').value);
    const offset = parseInt(document.getElementById('offset').value);

    const physicalAddress = translateAddressHelper(numPages, framesPerPage, pageSize, page, frame, offset);

    const output = document.getElementById('output');
    output.innerHTML = '';

    if (typeof physicalAddress === 'string') {
        output.innerHTML = physicalAddress; 
    } else {
        output.innerHTML = `Translated Physical Address: ${physicalAddress}`;
    }
}

function translateAddressHelper(numPages, framesPerPage, pageSize, page, frame, offset) {
    const totalFrames = numPages * framesPerPage;

    if (page >= numPages || frame >= framesPerPage) {
        return "Invalid input: Page or frame number out of bounds";
    }

    const physicalAddress = (page * framesPerPage + frame) * pageSize + offset;

    if (physicalAddress >= totalFrames * pageSize) {
        return "Invalid input: Physical address out of bounds";
    }

    return physicalAddress;
}
