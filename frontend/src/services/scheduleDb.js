export const defaultScheduleDB = {
    'Nursery 1A': {
        'Monday': ['Literacy', 'Numeracy', 'Break', 'Social Studies', 'Story Time'],
        'Tuesday': ['Numeracy', 'Literacy', 'Break', 'Music & Movement', 'Free Play'],
        'Wednesday': ['Literacy', 'Art & Craft', 'Break', 'Numeracy', 'Story Time'],
        'Thursday': ['Social Studies', 'Numeracy', 'Break', 'Literacy', 'Music & Movement'],
        'Friday': ['Art & Craft', 'Literacy', 'Break', 'Show & Tell', 'Free Play'],
    },
    'Crèche': {
        'Monday': ['Sensory Play', 'Nap Time', 'Feeding', 'Music & Movement', 'Free Play'],
        'Tuesday': ['Sensory Play', 'Nap Time', 'Feeding', 'Music & Movement', 'Free Play'],
        'Wednesday': ['Sensory Play', 'Nap Time', 'Feeding', 'Music & Movement', 'Free Play'],
        'Thursday': ['Sensory Play', 'Nap Time', 'Feeding', 'Music & Movement', 'Free Play'],
        'Friday': ['Sensory Play', 'Nap Time', 'Feeding', 'Music & Movement', 'Free Play'],
    },
    'Primary 4 Gold': {
        'Monday': ['Mathematics', 'English', 'Break', 'Science', 'Physical Education'],
        'Tuesday': ['English', 'Mathematics', 'Break', 'History', 'Geography'],
        'Wednesday': ['Science', 'English', 'Break', 'Mathematics', 'Art'],
        'Thursday': ['History', 'Science', 'Break', 'English', 'Mathematics'],
        'Friday': ['Physical Education', 'Art', 'Break', 'Geography', 'History'],
    }
}

export const getScheduleDB = () => {
    const data = localStorage.getItem('nsa_schedule_db');
    if (data) return JSON.parse(data);
    localStorage.setItem('nsa_schedule_db', JSON.stringify(defaultScheduleDB));
    return defaultScheduleDB;
}

export const updateSchedule = (className, day, index, newSubject) => {
    const db = getScheduleDB();
    if (!db[className]) {
        // Initialize an empty layout if the class doesn't exist yet
        db[className] = {
            'Monday': ['', '', '', '', ''],
            'Tuesday': ['', '', '', '', ''],
            'Wednesday': ['', '', '', '', ''],
            'Thursday': ['', '', '', '', ''],
            'Friday': ['', '', '', '', '']
        }
    }
    db[className][day][index] = newSubject;
    localStorage.setItem('nsa_schedule_db', JSON.stringify(db));
    return db;
}
