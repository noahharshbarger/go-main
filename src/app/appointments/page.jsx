

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AppointmentScheduler() {
  // Teaching: Date state management
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Teaching: Form state for appointment booking
  const [appointmentForm, setAppointmentForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    appointmentType: 'site-visit',
    notes: '',
    duration: 60
  })

  // Teaching: useEffect for local storage persistence
  useEffect(() => {
    const savedAppointments = localStorage.getItem('solarAppointments')
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  // Teaching: Save to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem('solarAppointments', JSON.stringify(appointments))
  }, [appointments])

  // Teaching: Date manipulation functions
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const isDateToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isDatePast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Teaching: Generate available time slots
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        
        // Check if slot is already booked
        const isBooked = appointments.some(apt => 
          apt.date === selectedDate.toDateString() && apt.time === timeString
        )
        
        // Check if slot is in the past for today
        let isPast = false
        if (isDateToday(selectedDate)) {
          const now = new Date()
          const slotTime = new Date(selectedDate)
          slotTime.setHours(hour, minute)
          isPast = slotTime < now
        }
        
        slots.push({
          time: timeString,
          display: formatTime(timeString),
          isBooked,
          isPast
        })
      }
    }
    
    return slots
  }

  // Teaching: Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay()) // Start from Sunday
    
    const days = []
    const currentDate = new Date(startDate)
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const appointmentCount = appointments.filter(apt => 
        apt.date === currentDate.toDateString()
      ).length
      
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: isDateToday(currentDate),
        isPast: isDatePast(currentDate),
        appointmentCount
      })
      
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return days
  }

  // Teaching: Form input handler
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setAppointmentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Teaching: Form submission with validation
  const handleBookAppointment = (e) => {
    e.preventDefault()
    
    // Validation
    if (!appointmentForm.customerName || !appointmentForm.customerEmail || !selectedTime) {
      alert('Please fill in all required fields and select a time slot.')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(appointmentForm.customerEmail)) {
      alert('Please enter a valid email address.')
      return
    }
    
    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      date: selectedDate.toDateString(),
      time: selectedTime,
      ...appointmentForm,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }
    
    // Teaching: Update appointments array immutably
    setAppointments(prev => [...prev, newAppointment])
    
    // Reset form
    setAppointmentForm({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      appointmentType: 'site-visit',
      notes: '',
      duration: 60
    })
    
    setSelectedTime('')
    setShowBookingForm(false)
    alert('Appointment booked successfully!')
  }

  // Teaching: Navigate months
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const appointmentTypes = [
    { value: 'site-visit', label: '🏠 Site Visit', duration: 90 },
    { value: 'consultation', label: '💬 Initial Consultation', duration: 60 },
    { value: 'proposal-review', label: '📋 Proposal Review', duration: 45 },
    { value: 'follow-up', label: '📞 Follow-up Call', duration: 30 },
    { value: 'installation-planning', label: '🔧 Installation Planning', duration: 120 }
  ]

  const timeSlots = generateTimeSlots()
  const calendarDays = generateCalendarDays()
  const todaysAppointments = appointments.filter(apt => apt.date === new Date().toDateString())

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>➡️</span>
              <span className="text-gray-900 font-medium">Appointment Scheduler</span>
            </div>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📅 Solar Appointment Scheduler
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Schedule site visits, consultations, and follow-up meetings with customers
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date())}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => !day.isPast && setSelectedDate(day.date)}
                    disabled={day.isPast}
                    className={`
                      p-3 text-center text-sm rounded-lg transition-colors relative
                      ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                      ${day.isToday ? 'bg-blue-100 font-bold' : ''}
                      ${selectedDate.toDateString() === day.date.toDateString() ? 'bg-blue-600 text-white' : ''}
                      ${day.isPast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                      ${!day.isCurrentMonth ? 'opacity-50' : ''}
                    `}
                  >
                    {day.date.getDate()}
                    {day.appointmentCount > 0 && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Date Info */}
              {selectedDate && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Available Times for {formatDate(selectedDate)}
                  </h3>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => !slot.isBooked && !slot.isPast && setSelectedTime(slot.time)}
                        disabled={slot.isBooked || slot.isPast}
                        className={`
                          p-2 text-sm rounded-lg border transition-colors
                          ${selectedTime === slot.time 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : slot.isBooked || slot.isPast
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                          }
                        `}
                      >
                        {slot.display}
                        {slot.isBooked && <div className="text-xs">Booked</div>}
                      </button>
                    ))}
                  </div>

                  {selectedTime && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setShowBookingForm(true)}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        📝 Book Appointment for {formatTime(selectedTime)}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Today's Appointments */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">Today's Appointments</h3>
              {todaysAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No appointments today</p>
              ) : (
                <div className="space-y-3">
                  {todaysAppointments.map((apt) => (
                    <div key={apt.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{formatTime(apt.time)}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {appointmentTypes.find(t => t.value === apt.appointmentType)?.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{apt.customerName}</p>
                      <p className="text-xs text-gray-500">{apt.customerPhone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold mb-4">Appointment Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Scheduled:</span>
                  <span className="font-bold">{appointments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week:</span>
                  <span className="font-bold">
                    {appointments.filter(apt => {
                      const aptDate = new Date(apt.date)
                      const weekStart = new Date()
                      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
                      const weekEnd = new Date(weekStart)
                      weekEnd.setDate(weekStart.getDate() + 6)
                      return aptDate >= weekStart && aptDate <= weekEnd
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Site Visits:</span>
                  <span className="font-bold">
                    {appointments.filter(apt => apt.appointmentType === 'site-visit').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Book Appointment</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-blue-900 font-medium">
                    📅 {formatDate(selectedDate)} at {formatTime(selectedTime)}
                  </p>
                </div>

                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={appointmentForm.customerName}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="customerEmail"
                        value={appointmentForm.customerEmail}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={appointmentForm.customerPhone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Appointment Type
                      </label>
                      <select
                        name="appointmentType"
                        value={appointmentForm.appointmentType}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {appointmentTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label} ({type.duration} min)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={appointmentForm.notes}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any specific details or preparation needed for this appointment..."
                    />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📝 Book Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}