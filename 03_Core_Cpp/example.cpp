#include <iostream>
#include <thread>
#include <chrono>
#include <boost/interprocess/shared_memory_object.hpp>
#include <boost/interprocess/mapped_region.hpp>
#include "headers/bufferHeader.h"

using namespace boost::interprocess;

int main() {
    std::cout << "[CORE] Algo Starting..." << std::endl;

    try {
        // Open the Shared Memory created by Node
        // Note: We use "open_only" because Node MUST create it first.
        shared_memory_object shm(open_only, "TEST_MEM", read_write);

        // Map the region
        mapped_region region(shm, read_write);

        // The "Magic": Cast the raw memory to your struct!
        // Now 'data' points exactly to the bytes Node is looking at.
        void* raw_ptr = region.get_address();
        bufferHeader* data = static_cast<bufferHeader*>(raw_ptr);

        std::cout << "[CORE] Conncected to shared memory" << std::endl;

        // The Loop (Real-time Transfer)
        while(true) {
            // READ from Node
            // Example: If Node updates the 'ltp'
            if(data->ltp > 0) {
                // logic
                std::cout << "Current LTP is: " << data->ltp << std::endl;
            }

            // Write to node
            // Let's pretend we calculated "Open Interest" (oi)
            data->oi += 1.5;
            data->feedTimeAtExchg += 1;

            // Sleep to prevent CPU burning (simulating work)
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
    }
    catch (const std::exception& e) {
        std::cerr << "[CORE ERROR] " << e.what() << std::endl;
        std::cerr << "--> Did you start with Node first? Node creates the memory." << std::endl;
        return 1;
    }

    return 0;
}