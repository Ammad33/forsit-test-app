import axios from "axios";

export default {

    async getTotalOrderSale() {
        try {
            const response = await axios.get(`http://localhost:3000/orderSale`);
            const result = response.data;
            let ordersArray = result[0].data.map((item) => item.orders);
            let salesArray = result[0].data.map((item) => item.sales);
            ordersArray = ordersArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
            salesArray = salesArray.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
            const newData = {
                ordersArray,
                salesArray
            };
            return newData;
        } catch (error) {
            console.error('Error fetching total order sale data:', error);
        }
    },


    async getOrderSale(filter, month) {
        let monthlyData = {
            "01": { "orders": 0, "sales": 0 },
            "02": { "orders": 0, "sales": 0 },
            "03": { "orders": 0, "sales": 0 },
            "04": { "orders": 0, "sales": 0 },
            "05": { "orders": 0, "sales": 0 },
            "06": { "orders": 0, "sales": 0 },
            "07": { "orders": 0, "sales": 0 },
            "08": { "orders": 0, "sales": 0 },
            "09": { "orders": 0, "sales": 0 },
            "10": { "orders": 0, "sales": 0 },
            "11": { "orders": 0, "sales": 0 },
            "12": { "orders": 0, "sales": 0 }
        };
        let result;
        try {
            const response = await axios.get(`http://localhost:3000/orderSale`);
            result = response.data;
            if (filter == 'monthly') {
                result = this.groupMonth(result, monthlyData);
                const ordersArray = result.map((item) => item.orders);
                const salesArray = result.map((item) => item.sales);
                const newData = {
                    ordersArray,
                    salesArray
                };
                return newData;
            }
            else if (filter == 'daily') {
                const ordersArray = result[0].data.map((item) => item.orders);
                const salesArray = result[0].data.map((item) => item.sales);
                const newData = {
                    ordersArray,
                    salesArray
                };
                return newData;
            }
            else if (filter == 'weekly') {
                result = this.groupDataByWeek(result, month)
                const ordersArray = result.map((item) => item.orders);
                const salesArray = result.map((item) => item.sales);
                const newData = {
                    ordersArray,
                    salesArray
                };
                return newData;
            }
        } catch (error) {
            console.error('Error fetching order sale data:', error);
        }
    },

    groupMonth(data, monthlyData) {
        data[0].data.forEach(entry => {
            // Extract the month from the date string
            let month = entry.date.split("-")[1];
            // Add the orders and sales to the respective month in monthlyData
            monthlyData[month].orders += entry.orders;
            monthlyData[month].sales += entry.sales;
        });

        // Ensure the keys are sorted before mapping to preserve order
        let result = Object.keys(monthlyData).sort().map(month => {
            return {
                "month": month,
                "orders": monthlyData[month].orders,
                "sales": monthlyData[month].sales
            };
        });

        return result;
    },

    getWeekNumber(entryDate) {
        const firstDayOfMonth = new Date(entryDate.getFullYear(), entryDate.getMonth(), 1);
        return Math.floor(((entryDate - firstDayOfMonth) / 86400000 + firstDayOfMonth.getDay()) / 7);
    },

    getWeeksInMonth(month, year) {
        const lastDayOfMonth = new Date(year, month + 1, 0);
        return this.getWeekNumber(lastDayOfMonth) + 1;
    },

    groupDataByWeek(data, month) {
        const monthData = data[0].data.filter(entry => {
            const entryMonth = parseInt(entry.date.split("-")[1]);
            return entryMonth === parseInt(month);
        });

        if (monthData.length === 0) return [];

        const year = new Date(monthData[0].date).getFullYear();
        const weeksInMonth = this.getWeeksInMonth(parseInt(month) - 1, year);

        let weeklyData = Array.from({ length: weeksInMonth }, () => ({ orders: 0, sales: 0 }));

        // Group and sum the data into weeklyData
        monthData.forEach(entry => {
            const entryDate = new Date(entry.date);
            const weekNumber = this.getWeekNumber(entryDate);

            if (weekNumber >= 0 && weekNumber < weeksInMonth) {
                weeklyData[weekNumber].orders += entry.orders;
                weeklyData[weekNumber].sales += entry.sales;
            } else {
                console.error('Invalid week number:', weekNumber, 'for entry:', entry);
            }
        });

        return weeklyData;
    }


};
