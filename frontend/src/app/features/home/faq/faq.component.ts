import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements AfterViewInit {
  @ViewChildren('Question') questionElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    // Set up accordion functionality
    this.questionElements.forEach((question) => {
      question.nativeElement.addEventListener('click', (event: Event) => {
        // Only toggle if clicking on the header, not the content
        const target = event.target as HTMLElement;
        const header = question.nativeElement.querySelector('.accordion-header');
        const content = question.nativeElement.querySelector('.accordion-content');
        
        // Check if click is within the header or its children
        if (header.contains(target) && !content.contains(target)) {
          // Toggle active class
          if (question.nativeElement.classList.contains('active')) {
            question.nativeElement.classList.remove('active');
          } else {
            // Optional: Close other open accordions (uncomment for single open accordion)
            // this.questionElements.forEach(q => q.nativeElement.classList.remove('active'));
            question.nativeElement.classList.add('active');
          }
        }
      });
    });

    // Set up tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.faq-category');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all tabs and categories
        tabButtons.forEach(btn => btn.classList.remove('active'));
        categories.forEach(category => category.classList.remove('active'));

        // Add active class to clicked tab and corresponding category
        button.classList.add('active');
        const categoryId = (button as HTMLElement).dataset['category'];
        document.getElementById(categoryId!)?.classList.add('active');
      });
    });
  }
}
