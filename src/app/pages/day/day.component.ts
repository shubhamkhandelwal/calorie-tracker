import { Component, OnInit } from '@angular/core';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, DocumentSnapshot, getDoc } from '@firebase/firestore';
import { DayMeal } from 'src/app/interface/day-meal';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {
  fromValue!: DayMeal;
  docSnap!: DocumentSnapshot;
  text: string = '';
  activeTab: number = 1;
  dayCalorieForm: FormGroup = new FormGroup({});
  tabs: any[] = [
    {
      name: 'Breakfast',
      id: 1,
      active: true,
      formName: 'breakfast',
    },
    {
      name: 'Morning Snack',
      id: 2,
      active: false,
      formName: 'morningSnack',
    },
    {
      name: 'Lunch',
      id: 3,
      active: false,
      formName: 'lunch',
    },
    {
      name: 'Evening Snack',
      id: 4,
      active: false,
      formName: 'eveningSnack',
    },
    {
      name: 'Dinner',
      id: 5,
      active: false,
      formName: 'dinner',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private store: Firestore,
    private spinner: SpinnerService,
    private router: Router
  ) {
    this.dayCalorieForm = new FormGroup({
      breakfast: new FormArray([]),
      morningSnack: new FormArray([]),
      lunch: new FormArray([]),
      eveningSnack: new FormArray([]),
      dinner: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.text =
      this.route.snapshot.paramMap.get('month')! +
      ' ' +
      this.route.snapshot.paramMap.get('day')!;
    this.getDayMealData();
  }

  tabSelected(id: number): void {
    this.activeTab = id;
    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      active: tab.id === id,
    }));
  }

  getMealFrom(meal: string): FormArray {
    return this.dayCalorieForm.get(meal) as FormArray;
  }

  addMealItem(meal: string): void {
    const fromGroup = new FormGroup({
      name: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      calorie: new FormControl('',Validators.required),
    });
    (this.dayCalorieForm.get(meal) as FormArray).push(fromGroup);
  }

  async saveDayCalories(): Promise<void> {
    try {
      this.spinner.show();
      await setDoc(
        doc(this.store, 'day', this.text),
        this.dayCalorieForm.value
      );
    } catch (error) {
      console.error(error);
    }
    this.spinner.hide();
  }

  deleteMealItem(id: number, meal: string): void {
    let mealArray = this.dayCalorieForm.get(meal) as FormArray;
    mealArray.removeAt(id);
  }

  calculateCalories(): number {
    let totalCalories = 0;
    for (const meal in this.dayCalorieForm.controls) {
      const fromArray = this.dayCalorieForm.controls[meal] as FormArray;
      if (fromArray.length > 0) {
        totalCalories += fromArray.controls.reduce(
          (prev, current) => prev + current.get('calorie')?.value,
          0
        );
      }
    }
    return totalCalories;
  }

  async getDayMealData() {
    this.spinner.show();
    const mealId =
      this.route.snapshot.paramMap.get('month')! +
      ' ' +
      this.route.snapshot.paramMap.get('day')!;

    this.docSnap = await getDoc(doc(this.store, 'day', mealId));
    const mealData: DayMeal = this.docSnap.data()! as DayMeal;
    const breakfastFrom: any[] = [];
    const morningSnackFrom: any[] = [];
    const lunchFrom: any[] = [];
    const eveningSnacktFrom: any[] = [];
    const dinnerFrom: any[] = [];
    mealData?.breakfast?.forEach((data) => {
      const group = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        quantity: new FormControl(data.quantity, Validators.required),
        calorie: new FormControl(data.calorie, Validators.required),
      });
      breakfastFrom.push(group);
    });

    mealData?.morningSnack.forEach((data) => {
      const group = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        quantity: new FormControl(data.quantity, Validators.required),
        calorie: new FormControl(data.calorie, Validators.required),
      });
      morningSnackFrom.push(group);
    });

    mealData?.lunch.forEach((data) => {
      const group = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        quantity: new FormControl(data.quantity, Validators.required),
        calorie: new FormControl(data.calorie, Validators.required),
      });
      lunchFrom.push(group);
    });

    mealData?.eveningSnack.forEach((data) => {
      const group = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        quantity: new FormControl(data.quantity, Validators.required),
        calorie: new FormControl(data.calorie, Validators.required),
      });
      eveningSnacktFrom.push(group);
    });

    mealData?.dinner.forEach((data) => {
      const group = new FormGroup({
        name: new FormControl(data.name, Validators.required),
        quantity: new FormControl(data.quantity, Validators.required),
        calorie: new FormControl(data.calorie, Validators.required),
      });
      dinnerFrom.push(group);
    });

    this.dayCalorieForm = new FormGroup({
      breakfast: new FormArray(breakfastFrom),
      morningSnack: new FormArray(morningSnackFrom),
      lunch: new FormArray(lunchFrom),
      eveningSnack: new FormArray(eveningSnacktFrom),
      dinner: new FormArray(dinnerFrom),
    });
    this.spinner.hide();
  }

  goBack(): void {
    this.router.navigate(['month', this.route.snapshot.paramMap.get('month')])
  }
}
